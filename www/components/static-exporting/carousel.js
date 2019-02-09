import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import ArrowNext from '../icons/arrow-next';
import ArrowPrev from '../icons/arrow-previous';

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

    this.count = React.Children.count(this.props.children);

    this.pivot = Math.floor(this.count / 2);
    this.state = {
      index: this.pivot
    };
  }

  next = () => this.setState(({ index }) => ({ index: (index + 1) % this.count }));
  prev = () =>
    this.setState(({ index }) => ({
      index: index === 0 ? this.count - 1 : index - 1
    }));

  render() {
    const { pivot } = this;
    const { index } = this.state;

    let newChildren = [];
    React.Children.forEach(this.props.children, (_, i) => {
      newChildren.push(this.props.children[(index + i) % this.count]);
    });

    return (
      <div className="carousel">
        <div className="slides">
          <PoseGroup animateOnMount={false}>
            {newChildren.map((child, i) => (
              <Item
                style={{ visibility: i < pivot - 1 || i > pivot + 1 ? 'hidden' : 'visible' }}
                pose={i === pivot ? 'selected' : 'unselected'}
                key={child.props.children[0].props.href}
              >
                <div className={`slide ${i === pivot ? 'selected' : 'unselected'}`}>{child}</div>
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
        <style jsx>{`
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
            transform: translate3d(calc(-50vw - ${slideWidth / 2 + slideWidth * pivot}rem), 0, 0);
          }

          .slide {
            margin: 0 3.5rem;
            pointer-events: none;
          }

          .slide.selected {
            pointer-events: all;
          }

          .arrow {
            display: flex;
            position: absolute;
            top: 8rem;
            transform: scale(2.5);
            cursor: pointer;
            user-select: none;
          }

          .arrow:hover > svg * {
            stroke: #fff;
          }

          .next {
            right: 4rem;
          }
          .previous {
            left: 4rem;
          }

          @media screen and (max-width: 960px) {
            .next {
              right: 2rem;
            }
            .previous {
              left: 2rem;
            }
            .slides {
              transform: translateX(
                calc(-50vw - ${tabletSlideWidth / 2 + tabletSlideWidth * pivot}rem)
              );
            }
            .slide {
              margin: 0 2rem;
            }
            .arrow {
              top: 2rem;
              transform: scale(2);
            }
          }

          @media screen and (max-width: 640px) {
            .next {
              right: 1rem;
            }
            .previous {
              left: 1rem;
            }
            .slides {
              transform: translateX(
                calc(-50vw - ${mobileSlideWidth / 2 + mobileSlideWidth * pivot}rem)
              );
            }
            .slide {
              margin: 0 2rem;
            }
            .arrow {
              top: 1rem;
              transform: scale(2);
            }
          }
        `}</style>
      </div>
    );
  }
}
