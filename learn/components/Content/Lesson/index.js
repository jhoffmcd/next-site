import React from 'react'
import StepBar from './StepBar'
import StepNav from '~/containers/Content/Lesson/StepNav'
import AnswerBox from '~/containers/Content/Lesson/AnswerBox'
import ErrorBox from '~/components/ErrorBox'
import Markdown from './Markdown'
import Head from 'next/head'
import PropTypes from 'prop-types'

const Lesson = class extends React.Component {
  renderContent (lesson) {
    const { stepId } = this.props
    if (!stepId) {
      return (<Markdown content={lesson.intro}/>)
    }

    if (!lesson.steps) {
      return (<p>Log in to get started.</p>)
    }

    const step = lesson.steps.find((s) => s.id === stepId)
    if (step.visited) return (<Markdown content={step.text}/>)

    return (<p>'Not Visited Yet!'</p>)
  }

  render () {
    const { course, courseId, lessonId, stepId, allCourses, error } = this.props

    if (error) return (<ErrorBox error={error} />)

    const lesson = course.lessons[0]
    const step = lesson.steps ? lesson.steps.find((s) => s.id === stepId) : null

    return (
      <div className='lesson-area'>
        <Head>
          <title>Learn - {lesson.name} | {SITE_NAME}</title>
        </Head>
        <h2 className='f1'>{lesson.name}</h2>
        <StepBar steps={lesson.steps || []} courseId={courseId} lessonId={lessonId} currentStepId={stepId} />
        <div className='content'>
          {this.renderContent(lesson)}
        </div>
        {(step && step.type === 'mcq') ? <AnswerBox courseId={courseId} lessonId={lessonId} step={step} /> : null }
        <div className='lesson-step-nav'>
          <StepNav steps={lesson.steps} courseId={courseId} lessonId={lessonId} currentStepId={stepId} allCourses={allCourses} />
        </div>
        <style jsx>{`
          h2 {
            margin: .8rem 0 2rem 0;
          }

          .content {
            margin: 3rem 0 0 0;
          }

          .lesson-step-nav {
            margin-top: 3rem;
          }
        `}</style>
      </div>
    )
  }
}

Lesson.propTypes = {
  error: PropTypes.object,
  courseId: PropTypes.string,
  lessonId: PropTypes.string,
  stepId: PropTypes.string,
  course: PropTypes.object,
  allCourses: PropTypes.array
}

Lesson.allCoursesFragment = (c) => c.createFragment(`
  fragment on Course {
    ...${StepNav.courseFragment(c)}
  }
`)

Lesson.courseFragment = (c, props) => {
  const steps = `
    steps {
      ...${StepBar.fragment(c)}
      ...${AnswerBox.fragment(c)}
      type
      text
      visited
    }
  `

  return c.createFragment(`
    fragment on Course {
      id
      lessons(ids: ["${props.lessonId}"]) {
        id
        name
        intro
        ${props.initialState.loginToken ? steps : ''}
      }
    }
  `)
}

export default Lesson
