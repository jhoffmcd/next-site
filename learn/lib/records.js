import React from 'react'
import courses from './courses'
import { useLocalStorage } from './localStorage'
import { useGetUser } from './user'
import { getToken } from './authenticate'
import { fetchCourses } from './api'

const getRecordId = ({ courseId, lessonId, stepId }) =>
  `${courseId}/${lessonId}${stepId ? `/${stepId}` : ''}`

const updateRecords = (records, meta, update) => {
  const id = getRecordId(meta)

  return {
    ...records,
    [id]: {
      ...(records[id] || {}),
      ...update
    }
  }
}

const mergeRecords = async (currentRecords, dispatch) => {
  const apiCourses = (await fetchCourses(getToken())) || []
  const setNewRecords = (newRecords, course) => {
    course.lessons.forEach(lesson => {
      lesson.steps.forEach(({ id: stepId, visited, points, givenAnswer, correctAnswer }) => {
        if (!visited) return

        const checked = (givenAnswer && givenAnswer === correctAnswer) || points <= 5
        const meta = { courseId: course.id, lessonId: lesson.id, stepId }
        const id = getRecordId(meta)
        const record = { ...currentRecords[id], checked, visited }

        if (givenAnswer) {
          record.answer = givenAnswer
          record.submitted = true
        }

        Object.assign(newRecords, { [id]: record })
      })
    })

    return newRecords
  }
  const records = apiCourses.reduce(setNewRecords, {})

  dispatch({ type: 'merge', records })
}

const reducer = (records, action) => {
  switch (action.type) {
    case 'init':
      return { ...action.data, ready: true }
    case 'merge':
      return { ...records, ...action.records, merged: true }
    case 'visit':
      return updateRecords(records, action.ids, { visited: true })
    case 'check':
      return updateRecords(records, action.ids, { checked: true })
    case 'submit':
      return updateRecords(records, action.ids, { submitted: true })
    case 'answer':
      return updateRecords(records, action.ids, { answer: action.answer })
    default:
      throw new Error()
  }
}

const Record = React.createContext()
const Records = React.createContext()

const RecordsProvider = ({ children }) => {
  const [records, record] = useLocalStorage('points', reducer, { ready: false })
  const user = useGetUser()
  const hasPoints = Boolean(records.ready && user && user.points)

  // Merge DB points with localStorage
  React.useEffect(() => {
    if (hasPoints && !records.merged) {
      mergeRecords(records, record)
    }
  }, [hasPoints, records.merged])

  return (
    <Record.Provider value={record}>
      <Records.Provider value={records}>{children}</Records.Provider>
    </Record.Provider>
  )
}

const useGetRecord = () => {
  const records = React.useContext(Records)

  const getRecord = ({ courseId, lessonId, stepId }) => {
    const id = `${courseId}/${lessonId}${stepId ? `/${stepId}` : ''}`
    return { ...records[id], ready: records.ready }
  }

  return getRecord
}

const useGetPoints = () => {
  const getRecord = useGetRecord()

  return courses.reduce(
    (points, course) =>
      points +
      course.lessons.reduce(
        (points, lesson) =>
          points +
          lesson.steps.reduce((points, step) => {
            const record = getRecord({
              courseId: course.id,
              lessonId: lesson.id,
              stepId: step.id
            })
            if (record.checked) {
              return points + (step.points || 0)
            }
            return points
          }, 0),
        0
      ),
    0
  )
}

const useRecord = ({ courseId, lessonId, stepId }) => {
  const getRecord = useGetRecord()
  const dispatch = React.useContext(Record)

  const record = getRecord({ courseId, lessonId, stepId })
  const dispatchRecord = action => dispatch({ ids: { courseId, lessonId, stepId }, ...action })

  return [record, dispatchRecord]
}

export { useRecord, useGetRecord, useGetPoints, RecordsProvider }
