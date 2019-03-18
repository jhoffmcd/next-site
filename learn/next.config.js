const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const withMDX = require('@zeit/next-mdx')()

module.exports = phase => {
  return withMDX({
    target: 'serverless',
    assetPrefix: phase === PHASE_PRODUCTION_BUILD ? '/learn' : '',
    pageExtensions: ['js', 'jsx', 'mdx'],
    env: {
      BACKEND_URL: process.env.BACKEND_URL || 'https://learn-server.nextjs.org',
      FIRST_COURSE: 'basics',
      FIRST_LESSON: 'getting-started',
      SITE_NAME: 'Next.js'
    }
  })
}
