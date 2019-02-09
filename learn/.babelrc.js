module.exports = {
  "presets": [
    "next/babel"
  ],
  "plugins": [
    "module:babel-root-import",
    ["transform-define", {
      BACKEND_URL: process.env.BACKEND_URL || 'https://learn-server.nextjs.org',
      FIRST_COURSE: 'basics',
      FIRST_LESSON: 'getting-started',
      SITE_NAME: 'Next.js',
      SITE_TITLE: 'Create SSR Enabled React Apps Easily'
    }]
  ]
}
