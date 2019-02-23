import Container from '../container';
import Button from '../button';
import SectionHeader from '../section-header';
import ShowcasePreview from './showcase-preview';
import IObserver from '../intersection-observer';

export default class Customers extends React.PureComponent {
  state = {
    loadPreview: false
  };

  handleIntersect = entry => {
    if (entry.intersectionRatio > 0) {
      this.setState({ loadPreview: true });
    }
  };

  render() {
    return (
      <IObserver
        once={true}
        rootMargin="50%"
        onIntersect={this.handleIntersect}
        render={({ innerRef }) => (
          <Container gray wide center padding role="region" aria-labelledby="customers">
            <SectionHeader
              innerRef={innerRef}
              anchor="showcases"
              id="customers"
              title="Who’s Using Next.js"
              description="We’re honored some of the most talented creatives out there build with Next.js"
            />
            {this.state.loadPreview && <ShowcasePreview />}
            <div>
              <style jsx>{`
                div {
                  z-index: 1;
                  position: relative;
                  margin-top: 2rem;
                }
              `}</style>
              <Button href="/showcase" invert>
                View Gallery
              </Button>
            </div>
          </Container>
        )}
      />
    );
  }
}
