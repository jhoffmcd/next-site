import Page from '../../components/page';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { MediaQueryConsumer } from '../../components/media-query';
import SocialMeta from '../../components/social-meta';

import Hero from '../../components/static-exporting/hero';
import Build from '../../components/static-exporting/build';
import UseCases from '../../components/static-exporting/use-cases';
import Links from '../../components/static-exporting/links';
import Learn from '../../components/static-exporting/learn';
import Features from '../../components/static-exporting/features';
import Docs from '../../components/static-exporting/docs';
import Customers from '../../components/static-exporting/customers';

const title = 'Features - Static Exporting | Next.js';
export default () => (
  <Page title={title}>
    <SocialMeta
      title={title}
      description="Leverage the speed and simplicity of static sites with the full power of Next.js"
      image="/static/twitter-cards/static-exporting.png"
      url="https://nexts.org/features/static-exporting"
      keywords="Static site generation, Static exporting, Static exports, Next, JavaScript, Web Framework"
    />
    <MediaQueryConsumer>
      {({ isMobile }) => (
        <Header height={64 + (isMobile ? 32 : 0)} shadow dotBackground active={64}>
          <Navbar />
        </Header>
      )}
    </MediaQueryConsumer>
    <Hero />
    <Build />
    <UseCases />
    <Links />
    <Learn />
    <Features />
    <Docs />
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
