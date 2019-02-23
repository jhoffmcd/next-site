import React from 'react'
import App, { Container } from 'next/app'
import url from 'url'

import { setToken, removeToken } from '../lib/authenticate'
import NProgress from '../components/nprogress'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if(!process.browser) {
      const {res, asPath, query: {loginToken, logout}} = ctx
      if((loginToken && loginToken.length < 50) || logout) {
        const parsedAsPath = url.parse(asPath)
        if(loginToken) {
          setToken(ctx, loginToken)
          res.writeHead(302, { Location: parsedAsPath.pathname })
          res.end()
          return {}
        }
        if(logout) {
          removeToken(ctx)
          res.writeHead(302, { Location: parsedAsPath.pathname })
          res.end()
          return {}
        }
      }
    }

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
        <NProgress />
      </Container>
    )
  }
}