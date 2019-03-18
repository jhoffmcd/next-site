import React from 'react'
import Head from 'next/head'

import { RecordsProvider } from '../lib/records'
import Navigation from '~/components/Navigation'
import Lesson from '~/components/Lesson'
import Markdown from '~/components/Markdown'
import Page from '~/components/new/page'
import Header from '~/components/new/header'
import Navbar from '~/components/new/navbar'
import Footer from '~/components/new/footer'
import Container from '~/components/new/container'
import { MediaQueryConsumer } from '~/components/new/media-query'

const Layout = ({ meta, children }) => (
  <Page>
    <Head>
      <title>
        Learn - {meta.title} | {process.env.SITE_NAME}
      </title>
    </Head>
    <MediaQueryConsumer>
      {({ isMobile }) => {
        return (
          <>
            <Header height={64 + (isMobile ? 32 : 0)} shadow defaultActive>
              <Navbar />
            </Header>
            <Container wide={isMobile}>
              <div className="content">
                <RecordsProvider>
                  <div className="navigation">
                    <Navigation meta={meta} />
                  </div>
                  <div className="lesson">
                    <Lesson meta={meta}>
                      <Markdown>{children}</Markdown>
                    </Lesson>
                  </div>
                </RecordsProvider>
              </div>
              <style jsx>{`
                .content {
                  display: flex;
                  margin-top: 1rem;
                  margin-bottom: 5rem;
                }

                .navigation {
                  padding: 1rem 3rem 0 0;
                  max-width: 312px;
                }

                .lesson {
                  flex: 1;
                  width: 100%;
                  min-width: 0;
                  max-width: 600px;
                }
                // CSS only media query for mobile + SSR
                @media screen and (max-width: 640px) {
                  .content {
                    display: flex;
                    flex-direction: column;
                    padding: 0 1rem;
                    margin-bottom: 5rem;
                  }
                  .navigation {
                    margin: 0 -1rem;
                  }
                }
              `}</style>
            </Container>
          </>
        )
      }}
    </MediaQueryConsumer>
    <Footer />
  </Page>
)

export default Layout
