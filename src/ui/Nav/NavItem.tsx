import React from "react"
import { Link, NavLink } from "react-router-dom"
import crossIcon from "shared/assets/icons/cross.svg"

/**
 * This Link is specific to the NavItem component
 */
const NavItemLink = React.forwardRef(
  (
    {
      navigate,
      target,
      children,
      ...props
    }: {
      navigate: () => void
      target?: string
    } & React.HTMLProps<HTMLAnchorElement>,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => (
    // on-click handler is also handling keyboard events on this link. this is not an static element
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <>
      <a
        ref={ref}
        // need to pass down props from react router
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        onClick={(e) => {
          e.preventDefault()
          return target === "blank"
            ? window.open(props.href, target)
            : navigate()
        }}
      >
        {children}
      </a>
      <style jsx>
        {`
          a.link {
            position: relative;
            color: var(--secondary-s1-50);
            font-family: var(--sans);
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
          }

          a.link:hover,
          a.link:focus {
            color: var(--secondary-s1-80);
          }

          a.link.active {
            color: var(--secondary-s1-100);
          }

          a.active:after {
            content: url(${crossIcon});
            width: 26px;
            position: absolute;
            bottom: -42px;
            right: 0;
            left: 0;
            margin: 0 auto;
          }
        `}
      </style>
    </>
    /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
  )
)

type NavItemProps = {
  path: string
  title: string
  exact?: boolean
  extraInfo?: string
  target?: string
}

export default function NavItem({
  path,
  title,
  exact = false,
  extraInfo,
  target,
}: NavItemProps): JSX.Element {
  return (
    <>
      {target === "blank" ? (
        <Link
          className="link"
          component={NavItemLink}
          to={{ pathname: path }}
          target={target}
          rel="noopener noreferrer"
        >
          {title}
          {extraInfo && <div className="link_extra_info">{extraInfo}</div>}
        </Link>
      ) : (
        <NavLink
          className="link"
          activeClassName="active"
          component={NavItemLink}
          to={path}
          exact={exact}
        >
          {title}
          {extraInfo && <div className="link_extra_info">{extraInfo}</div>}
        </NavLink>
      )}
      <style jsx>{`
        .link_extra_info {
          white-space: nowrap;
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          line-height: 24px;
          font-weight: 700;
          color: var(--semantic-attention);
        }
      `}</style>
    </>
  )
}
