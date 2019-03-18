import { SkipNavContent } from '@reach/skip-nav';

import Page from '../../components/page';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Container from '../../components/container';
import withPure from '../../components/hoc/pure';

import Markdown, { headings } from '../../components/docs/docs.mdx';
import Documentation, { components } from '../../components/docs/documentation';

const Content = withPure(() => <Markdown components={components} />);

export default () => (
  <>
    <Header
      height={{ desktop: 64, mobile: 64 + 32 }}
      shadow={{ desktop: true, tablet: true, mobile: false }}
      defaultActive
    >
      <Navbar />
    </Header>
    <Page>
      <Container>
        <Documentation headings={headings}>
          <SkipNavContent />
          <Content />
        </Documentation>
      </Container>
    </Page>
  </>
);
