export function setToken({ res }, token) {
  if (process.browser) return

  res.setHeader(
    'Set-Cookie',
    require('cookie').serialize('loginToken', token, {
      path: '/learn',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: false
    })
  )
}

export function removeToken({ res }) {
  if (!process.browser) {
    res.setHeader(
      'Set-Cookie',
      require('cookie').serialize('loginToken', null, {
        path: '/learn',
        expires: new Date(Date.now() - 1000),
        httpOnly: false
      })
    )
  } else {
    const Cookies = require('js-cookie')
    Cookies.remove('loginToken', { path: '/learn' })
  }
}

export function getToken({ req } = {}) {
  if (!process.browser) {
    const { cookie } = req.headers || {}
    if (!cookie) return

    const { loginToken } = require('cookie').parse(cookie)
    return loginToken
  }

  const Cookies = require('js-cookie')
  const { loginToken } = Cookies.get()
  return loginToken
}
