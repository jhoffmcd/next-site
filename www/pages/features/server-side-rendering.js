import Page from '../../components/page';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { MediaQueryConsumer } from '../../components/media-query';
import SocialMeta from '../../components/social-meta';

import Hero from '../../components/server-side-rendering/hero';
import Features from '../../components/server-side-rendering/features';
import Benefits from '../../components/server-side-rendering/benefits';
import Examples from '../../components/server-side-rendering/examples';
import Docs from '../../components/server-side-rendering/docs';
import Scalable from '../../components/server-side-rendering/scalable';
import Customers from '../../components/server-side-rendering/customers';

const title = 'Features - Server Side Rendering | Next.js';
export default () => (
  <Page title={title}>
    <SocialMeta
      title={title}
      description="Take the pain out of creating Universal React apps with Next.js"
      image="/static/twitter-cards/server-side-rendering.png"
      url="https://nexts.org/features/server-side-rendering"
      keywords="Server side rendering, Server rendering, SSR, Next, JavaScript, Web Framework"
    />
    <MediaQueryConsumer>
      {({ isMobile }) => (
        <Header
          height={64 + (isMobile ? 32 : 0)}
          shadow
          dotBackground
          active={64}
        >
          <Navbar />
        </Header>
      )}
    </MediaQueryConsumer>
    <Hero />
    <Features />
    <Benefits />
    <Examples />
    <Docs />
    <Scalable />
    <Customers />
    <Footer />
    <style jsx>
      {`
        :global(html) {
          scroll-behavior: smooth;
        }
        :global(body) {
          scroll-behavior: unset;
        }
      `}
    </style>
  </Page>
);
