import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import Image from './image';
import { MediaQueryConsumer } from './media-query';
import ArrowNext from './icons/arrow-next';
import ArrowPrev from './icons/arrow-previous';

const slideWidth = 43.5; //rem
const tabletSlideWidth = 23; //rem
const mobileSlideWidth = 18; //rem

const Item = posed.div({
  flip: {
    transition: {
      ease: 'easeOut',
      duration: 250
    }
  },
  unselected: {
    originX: 50,
    originY: 50,
    transition: {
      ease: 'easeIn',
      duration: 250
    },
    opacity: 0.3,
    scale: 1
  },
  selected: {
    originX: 50,
    originY: 50,
    transition: {
      ease: 'easeIn',
      duration: 250
    },
    opacity: 1,
    scale: 1.1
  }
});

export default class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pivot = Math.floor(props.slides.length / 2);
    this.state = {
      index: this.pivot
    };
  }

  next = () =>
    this.setState(({ index }) => ({
      index: (index + 1) % this.props.slides.length
    }));

  prev = () =>
    this.setState(({ index }) => ({
      index: index === 0 ? this.props.slides.length - 1 : index - 1
    }));

  render() {
    const { pivot } = this;
    const { slides } = this.props;
    const { index } = this.state;

    const newSlides = [];

    slides.forEach((_, i) => {
      newSlides.push(slides[(index + i) % slides.length]);
    });

    return (
      <div className="container">
        <MediaQueryConsumer>
          {({ isMobile, isTablet }) => {
            const size = {
              width: isMobile ? 224 : isTablet ? 304 : 584,
              height: isMobile ? 128 : isTablet ? 160 : 328
            };
            return (
              <div className="carousel">
                <div className="slides">
                  <PoseGroup animateOnMount={false}>
                    {newSlides.map(({ image, alt, href, logo }, i) => (
                      <Item
                        style={{
                          visibility:
                            i < pivot - 1 || i > pivot + 1
                              ? 'hidden'
                              : 'visible'
                        }}
                        pose={i === pivot ? 'selected' : 'unselected'}
                        key={href}
                        onClick={
                          i === pivot - 1
                            ? this.prev
                            : i === pivot + 1
                              ? this.next
                              : undefined
                        }
                      >
                        <div className="slide-content">
                          <a
                            href={href}
                            className={`slide ${
                              i === pivot ? 'selected' : 'unselected'
                            }`}
                          >
                            <Image src={image} alt={alt} {...size} />
                          </a>
                          <div className="logo">{logo}</div>
                        </div>
                      </Item>
                    ))}
                  </PoseGroup>
                </div>

                <div className="arrow next" onClick={this.next}>
                  <ArrowNext color="#8c8c8c" />
                </div>
                <div className="arrow previous" onClick={this.prev}>
                  <ArrowPrev color="#8c8c8c" />
                </div>
              </div>
            );
          }}
        </MediaQueryConsumer>
        <style jsx>{`
          .container {
            height: 25rem;
            width: 100%;
          }

          .carousel {
            position: relative;
            height: 100%;
            width: 100%;
          }

          .slides {
            display: flex;
            position: absolute;
            top: 0;
            left: 100%;
            transition: transform ease-out 400ms;
            transform: translate3d(
              calc(-50vw - ${slideWidth / 2 + slideWidth * pivot}rem),
              0,
              0
            );
          }

          .logo {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
            width: 12.5rem;
          }

          .slide {
            flex-direction: column;
            align-items: center;
            margin: 0 3.5rem;
            pointer-events: none;
          }

          .slide.selected {
            pointer-events: all;
          }

          .slide-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 2rem;
          }

          .slide-content :global(img) {
            user-select: none;
            user-drag: none;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center top;
            cursor: pointer;
            border-radius: 7px;
            box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1),
              0px 10px 20px rgba(0, 0, 0, 0.08);
          }

          .slide-content :global(img:hover) {
            box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1),
              0px 10px 10px rgba(0, 0, 0, 0.08);
          }

          .slide-content :global(figure) {
            margin: 0;
          }

          .arrow {
            display: flex;
            position: absolute;
            padding: 0.5rem;
            margin: -0.5rem;
            top: 10rem;
            transform: scale(2.5);
            cursor: pointer;
            user-select: none;
          }

          .arrow:hover :global(> svg *) {
            stroke: #000;
          }

          .next {
            right: 4rem;
          }
          .previous {
            left: 4rem;
          }

          @media screen and (max-width: 960px) {
            .container {
              height: 14rem;
            }
            .next {
              right: 2rem;
            }
            .previous {
              left: 2rem;
            }
            .slides {
              transform: translateX(
                calc(
                  -50vw - ${tabletSlideWidth / 2 + tabletSlideWidth * pivot}rem
                )
              );
            }
            .slide {
              margin: 0 2rem;
            }
            .arrow {
              top: 4rem;
              transform: scale(2);
            }
          }

          @media screen and (max-width: 640px) {
            .container {
              height: 12rem;
            }
            .next {
              right: 1rem;
            }
            .previous {
              left: 1rem;
            }
            .slides {
              transform: translateX(
                calc(
                  -50vw - ${mobileSlideWidth / 2 + mobileSlideWidth * pivot}rem
                )
              );
            }
            .slide {
              margin: 0 2rem;
            }
            .arrow {
              top: 3rem;
              transform: scale(2);
            }
          }
        `}</style>
      </div>
    );
  }
}
