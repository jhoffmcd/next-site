import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import Highlight from 'react-highlight';

import Container from '../container';
import Window from '../window';
import Site from './svg/site';
import TitleOverlay from './svg/title-overlay';
import AvatarOverlay from './svg/avatar-overlay';
import SidebarOverlay from './svg/sidebar-overlay';
import Checkmark from '../icons/checkmark';

const files = [
  {
    name: 'Avatar.js',
    content: `export default function Avatar({ src }) {
  return (
    <>
      <img src={ src } />

      <style jsx>{\`
        img { border-radius: 50%; width: 24px; height: 24px; }
      \`}</style>
    </>
  )
}`
  },
  {
    name: 'TitleBlock.js',
    content: `export default function TitleBlock({ title, description }) {
  return (
    <div>
      <h1>{ title }</h1>
      <p>{ description }</p>

      <style jsx>{\`
        h1 { font-size: 32px; margin-bottom: 16px; }
        p { font-size: 16px; }
      \`}</style>
    </div>
  )
}`
  },
  {
    name: 'Sidebar.js',
    content: `export default Sidebar({ name, items }) {
  return (
    <div>
      <h2>{ name }</h2>
      { items.map(({ data }) => <span>{data}</span>) }

      <style jsx>{\`
        h2 { font-size: 24px; }
        span { font-weight: 600; }
      \`}</style>
    </div>
  )
}`
  }
];

const Anim = posed.div({
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
});

export default () => {
  const [selected, select] = React.useState(0);
  const { name } = files[selected];

  React.useEffect(() => {
    if (window.innerWidth > 1023) {
      const interval = setInterval(() => {
        select(current => ++current % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Container wide dark>
      <div className="col">
        <ul>
          <li>
            <Checkmark inverse />
            <h4>Component Friendly</h4>
          </li>
          <li>
            <Checkmark inverse />
            <h4>Fully-Featured CSS</h4>
          </li>
          <li>
            <Checkmark inverse />
            <h4>SSR Enabled</h4>
          </li>
          <li>
            <Checkmark inverse />
            <h4>Developer Focused</h4>
          </li>
        </ul>

        <div className="flex">
          <div className="terminal-container">
            <Window
              title={name}
              height={297}
              backgroundColor="black"
            >
              <PoseGroup>
                {selected === 0 && (
                  <Anim key={0}>
                    <Highlight className="javascript">
                      {files[0].content}
                    </Highlight>
                  </Anim>
                )}
                {selected === 1 && (
                  <Anim key={1}>
                    <Highlight className="javascript">
                      {files[1].content}
                    </Highlight>
                  </Anim>
                )}
                {selected === 2 && (
                  <Anim key={2}>
                    <Highlight className="javascript">
                      {files[2].content}
                    </Highlight>
                  </Anim>
                )}
              </PoseGroup>
            </Window>
          </div>

          <div className="site-container">
            <Site />
            <div className="overlay-container">
              <PoseGroup>
                {selected === 0 && (
                  <Anim key={0}>
                    <AvatarOverlay />

                  </Anim>
                )}
                {selected === 1 && (
                  <Anim key={1}>
                    <TitleOverlay />
                  </Anim>
                )}
                {selected === 2 && (
                  <Anim key={2}>
                    <SidebarOverlay />
                  </Anim>
                )}
              </PoseGroup>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          ul {
            align-self: stretch;
            padding: 0 1rem;
            margin: 2.5rem 0 0 0;
            display: flex;
            list-style-type: none;
            align-items: center;
            justify-content: space-between;
          }
          li {
            display: flex;
            align-items: center;
          }
          h4 {
            margin: 0 0 0 0.5rem;
          }
          img {
            margin-top: 1rem;
            width: 90%;
          }
          .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
            margin: 2.5rem 1rem 3rem;
          }
          .terminal-container {
            width: 100%;
            max-width: 29.5rem;
          }
          .terminal-container :global(pre) {
            margin: 0;
            white-space: pre-wrap;
            font-size: 12px;
            line-height: 1.5;
            padding: 0 1rem;
          }
          .site-container {
            display: flex;
            position: relative;
          }
          .terminal-container, .site-container {
            box-shadow: rgba(0, 0, 0, 0.48) 0px 2px 10px, rgba(0, 0, 0, 0.38) 0px 14px 50px;
            border-radius: 4px;
          }
          .overlay-container {
            position: absolute;
            top: 32px;
            left: 0px;
          }
          .col {
            margin: 0 auto;
            max-width: 64rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .terminal-container :global(.hljs-keyword),
          .terminal-container :global(.hljs-params),
          .terminal-container :global(.hljs-name),
          .terminal-container :global(.hljs-tag) {
            font-weight: 600;
          }

          @media screen and (max-width: 1023px) {
            ul {
              align-self: initial;
              flex-direction: column;
              align-items: flex-start;
              margin: 0 1rem 2.5rem 1rem;
            }
            li {
              margin: 1rem 0;
            }
            .col {
              align-items: center;
              flex-direction: column-reverse;
            }
            .flex {
              padding: 0 1rem;
              margin: 4rem 0 3rem;
            }
            .terminal-container {
              margin: 0 auto;
            }
            .site-container {
              display: none;
            }
          }
        `}
      </style>
    </Container>
  );
};
