import endpoints from './endpoints'

export function login() {
  const encodedCamebackUrl = encodeURIComponent(location.href)
  const href = `${endpoints.login}?needToken=1&appRedirectUrl=${encodedCamebackUrl}`

  location.href = href
}

export function logout(loginToken) {
  const encodedCamebackUrl = encodeURIComponent(`${location.href}?logout=1`)
  // It's important to send the loginToken since that's the way
  // how we say our auth server to logout the user
  const href = `${endpoints.logout}?loginToken=${loginToken}&appRedirectUrl=${encodedCamebackUrl}`

  location.href = href
}
