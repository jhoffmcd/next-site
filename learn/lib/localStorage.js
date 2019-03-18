import React from 'react'

let isLocalStorageReady = false

const _localStorage =
  typeof window !== 'undefined' ? localStorage : { getItem: () => {}, setItem: () => {} }

export const getStoredValue = key => {
  try {
    return JSON.parse(_localStorage.getItem(key))
  } catch (e) {
    // Ignore invalid JSON from localStorage
  }
}

export const useLocalStorage = (key, reducer, initialState) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    (isLocalStorageReady && getStoredValue(key)) || initialState
  )

  // Defer the usage of localStorage after the initial render to avoid unmatching content
  React.useEffect(() => {
    if (!isLocalStorageReady) {
      isLocalStorageReady = true

      const value = getStoredValue(key)
      dispatch({ type: 'init', data: value })
    }
  }, [])

  React.useEffect(() => {
    _localStorage.setItem(key, JSON.stringify(state))
  })

  return [state, dispatch]
}
