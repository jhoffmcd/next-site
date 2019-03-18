import { withRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';

import Page from '../components/page';
import HeaderLegacy from '../components/header-legacy';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Tabs from '../components/tabs';

import Title from '../components/showcase/title';
import List from '../components/showcase/list';
import Filter from '../components/showcase/filter';
import SiteDetail from '../components/showcase/site-detail';
import SocialMeta from '../components/social-meta';

import { categories, mapping } from '../showcase-manifest';

const HEADER_HEIGHT = 16 * 12;

function Showcase({ router }) {
  const { item, from } = router.query;

  return (
    <Page title="Showcase | Next.js">
      <SocialMeta
        image="/static/twitter-cards/showcase.png"
        title="Showcase | Next.js"
        url="https://nextjs.org/showcase"
        description="Meet hundreds of beautiful websites powered by Next.js"
      />
      <HeaderLegacy height={0} zIndex={1001} background="white" defaultActive>
        <Navbar />
      </HeaderLegacy>
      <SiteDetail siteData={mapping[item]} from={from} />
      <SkipNavContent />
      <Tabs data={categories} anchor>
        {(onSelect, selectedId) => (
          <>
            <HeaderLegacy
              height={{
                desktop: HEADER_HEIGHT + 64 + 32,
                mobile: HEADER_HEIGHT + 64 + 32 + 32
              }}
              distance={HEADER_HEIGHT}
              offset={-HEADER_HEIGHT}
              shadow
            >
              <Title
                height={{
                  desktop: HEADER_HEIGHT + 64,
                  mobile: HEADER_HEIGHT + 64 + 32
                }}
              />
              <Filter onSelect={onSelect} selectedId={selectedId} />
            </HeaderLegacy>
            <List category={selectedId} />
          </>
        )}
      </Tabs>
      <Footer />
    </Page>
  );
}

export default withRouter(Showcase);
