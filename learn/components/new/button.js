import Link from 'next/link'
import classNames from 'classnames'
import { transparentize, darken } from 'polished'

import withPure from './pure'

export default withPure(
  ({
    children,
    disabled,
    invert,
    light,
    large,
    href,
    as,
    color,
    shadowColor,
    noHover,
    flat,
    full,
    className,
    prefetch,
    ...props
  }) => {
    let a = (
      <a
        className={classNames(className, 'fw4 no-drag', { invert, disabled })}
        role="button"
        {...props}
      >
        {children}
        <style jsx>{`
          a {
            display: inline-block;
            cursor: pointer;
            text-decoration: none;
            padding: 0.25rem 0.5rem;
            margin: -0.25rem -0.5rem;
            vertical-align: middle;
            border-radius: 7px;
            white-space: nowrap;
            color: ${color || '#0076ff'};
            transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
            ${full
              ? `
            margin: 0;
            height: 2.5rem;
            padding: 0 1rem;
            line-height: 2.5rem;
          `
              : ''}
          }
          a:hover {
            color: ${color || '#0076ff'};
            background: ${shadowColor || 'rgba(0,118,255,0.1)'};
          }
          a.invert {
            margin: 0;
            border-radius: 7px;
            color: white;
            background: ${color || '#0076ff'};
            ${flat
              ? `box-shadow: 0 2px 6px 0 ${shadowColor || 'rgba(0, 0, 0, 0.12)'};`
              : light
              ? `
              box-shadow: 0 2px 6px 0 ${shadowColor || 'rgba(0,118,255,0.39)'};
            `
              : `
              box-shadow: 0 4px 14px 0 ${shadowColor || 'rgba(0,118,255,0.39)'};
            `}
            ${light
              ? ''
              : `
              padding: 0 2rem;
              height: 2.5rem;
              line-height: 2.5rem;
            `}
          }
          a.invert:hover {
            ${noHover
              ? ''
              : `
            background: ${color ? transparentize(0.1, color) : 'rgba(0,118,255,0.9)'};
            box-shadow: 0 6px 20px ${shadowColor || 'rgba(0,118,255,0.23)'};
          `}
          }
          a.invert:active {
            background: ${color ? darken(0.05, color) : '#006ae6'};
          }
          a.disabled {
            color: #c7c7c7;
          }
          a.disabled:hover {
            background: #f5f5f5;
          }
        `}</style>
      </a>
    )

    if (href) {
      return (
        <Link href={href} as={as} prefetch={prefetch || false}>
          {a}
        </Link>
      )
    }
    return a
  }
)
