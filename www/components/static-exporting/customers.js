import Container from '../container';
import SectionHeader from '../section-header';
import Blockchain from '../icons/companies/blockchain';
import Expo from '../icons/companies/expo';
import Blockstack from '../icons/companies/blockstack';
import Material from '../icons/companies/material-ui';
import Plotly from '../icons/companies/plotly';

import Carousel from './carousel';

export default () => (
  <Container padding wide>
    <div className="col">
      <SectionHeader id="customers" title="Who's Using Static Exports" />

      <div className="carousel-container">
        <Carousel>
          <div className="col">
            <a href="https://expo.io/">
              <img src="/static/images/showcases/showcases-13.jpg" alt="Expo" />
            </a>
            <div className="logo">
              <Expo />
            </div>
          </div>
          <div className="col">
            <a href="https://blockchain.com/">
              <img src="/static/images/showcases/blockchain.png" alt="Blockchain" />
            </a>
            <div className="logo">
              <Blockchain />
            </div>
          </div>
          <div className="col">
            <a href="https://plot.ly/">
              <img src="/static/images/showcases/plotly.jpg" alt="Plotly" />
            </a>
            <div className="logo plotly-logo">
              <Plotly />
            </div>
          </div>
          <div className="col">
            <a href="https://material-ui.com/">
              <img src="/static/images/showcases/material-ui.jpg" alt="Material UI" />
            </a>
            <div className="logo">
              <Material />
            </div>
          </div>
          <div className="col">
            <a href="https://blockstack.org/">
              <img src="/static/images/showcases/blockstack.png" alt="Blockstack" />
            </a>
            <div className="logo">
              <Blockstack />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
    <style jsx>
      {`
        h4 {
          margin: 0;
        }

        .col {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 2rem;
        }

        .left-container {
          text-align: center;
          align-items: center;
        }

        .logo {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          width: 12.5rem;
        }

        .plotly-logo {
          width: 7rem;
        }

        img {
          height: 20.5rem;
          width: 36.5rem;
          user-select: none;
          user-drag: none;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          margin-top: -2rem;
          cursor: pointer;
          border-radius: 7px;
          box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1),
            0px 10px 20px rgba(0, 0, 0, 0.08);
          opacity: 0.95;
        }

        img:hover {
          opacity: 1;
          box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1),
            0px 10px 10px rgba(0, 0, 0, 0.08);
        }

        .divider {
          width: calc(100% - 2rem);
          max-width: 62rem;
          border-bottom: 1px solid #eaeaea;
          margin: 6rem 0 3rem 0;
        }

        .carousel-container {
          margin-top: 3rem;
          height: 22rem;
          width: 100%;
        }

        @media screen and (max-width: 960px) {
          .carousel-container {
            height: 12rem;
          }

          img {
            height: 10rem;
            width: 19rem;
          }

          .divider {
            display: none;
          }
        }

        @media screen and (max-width: 640px) {
          .carousel-container {
            height: 10rem;
          }

          img {
            height: 8rem;
            width: 14rem;
          }
        }
      `}
    </style>
  </Container>
);
