import fetch from 'isomorphic-unfetch'
import endpoints from './endpoints'
import { getStoredValue } from './localStorage'

const userQuery = JSON.stringify({
  query: `
    {
      user {
        points,
        name,
        username
      }
    }
  `
})

const coursesQuery = JSON.stringify({
  query: `
    {
      courses {
        id
        lessons {
          id
          steps {
            id
            points
            visited
            givenAnswer
            correctAnswer
          }
        }
      }
    }
  `
})

async function gqlFetch(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    const { data } = await res.json()

    return data
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('fetch error ocurred', e)
    }
  }
}

export async function fetchUser(loginToken) {
  const url = `${endpoints.graphql}?loginToken=${loginToken}`
  const data = await gqlFetch(url, userQuery)

  return data && data.user
}

export async function fetchCourses(loginToken) {
  const url = `${endpoints.graphql}?loginToken=${loginToken}`
  const data = await gqlFetch(url, coursesQuery)

  return data && data.courses
}

export async function getUser(loginToken) {
  const user = process.browser && getStoredValue('user')
  return user || (loginToken && (await fetchUser(loginToken)))
}
