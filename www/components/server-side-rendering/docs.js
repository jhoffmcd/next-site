import Container from '../container';
import Button from '../button';
import Abstraction from './svg/abstraction';

export default () => (
  <Container wide padding>
    <div className="flex">
      <div className="col">
        <h2 className="f0 fw6">The Right Abstraction</h2>
        <div className="content">
          <p>
            Next.js extends React to provide a powerful method for loading a page's initial data, no
            matter where it is coming from. With a single place to prepopulate page context,
            server-side rendering with Next.js seamlessly integrates with any existing data-fetching
            strategy.
          </p>
        </div>
        <div>
          <Button invert href="/docs#fetching-data-and-component-lifecycle">
            View Documentation
          </Button>
        </div>
      </div>

      <div className="abstraction">
        <Abstraction />
      </div>
    </div>
    <style jsx>
      {`
        p {
          margin: 0;
        }

        code {
          color: rgb(212, 0, 255);
        }

        h2 {
          margin: 0 0 1.5rem 0;
          line-height: 1.3;
        }

        .flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .content {
          margin: 0 0 2.5rem 0;
          max-width: 27rem;
        }

        .abstraction {
          margin-top: -24rem;
        }

        @media screen and (max-width: 960px) {
          .flex {
            justify-content: initial;
            flex-direction: column-reverse;
          }
          .col {
            align-items: center;
            text-align: center;
          }

          h2 {
            margin-top: 1.5rem;
          }

          .content {
            max-width: 27rem;
          }
          .abstraction {
            margin-top: -25rem;
          }
        }

        @media screen and (max-width: 640px) {
          .abstraction {
            transform: scale(0.6);
          }
          .content {
            margin: 0 1rem 2.5rem 1rem;
          }
          .col {
            margin-top: -9rem;
          }
        }
      `}
    </style>
  </Container>
);
