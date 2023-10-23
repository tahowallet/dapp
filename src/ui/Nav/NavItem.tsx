import React from "react"
import { Link, NavLink } from "react-router-dom"

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
            color: var(--secondary-s1-60);
            font-family: var(--sans);
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
          }

          a.link:hover,
          a.link:focus {
            color: var(--secondary-s1-100);
          }

          a.link.active {
            color: var(--secondary-s1-100);
          }

          a.active:after {
            content: "";
            background: var(--primary-p2-100);
            width: 32px;
            height: 2px;
            position: absolute;
            top: -9px;
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

export type NavItemProps = {
  path: string
  title: string
  exact?: boolean
  extraInfo?: string
  target?: string
  icon?: string
}

export default function NavItem({
  path,
  title,
  exact = false,
  extraInfo,
  target,
  icon,
}: NavItemProps): JSX.Element {
  return (
    <div className="link-wrapper">
      {target === "blank" ? (
        <Link
          className="link"
          component={NavItemLink}
          to={{ pathname: path }}
          target={target}
          rel="noopener noreferrer"
        >
          {title}
          {extraInfo && <div className="link-extra-info">{extraInfo}</div>}
          {icon && <span className="link-extra-icon" />}
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
          {extraInfo && <div className="link-extra-info">{extraInfo}</div>}
        </NavLink>
      )}
      <style jsx>{`
        .link {
          display: flex;
        }
        .link-extra-info {
          white-space: nowrap;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          line-height: 24px;
          font-weight: 700;
          color: var(--semantic-attention);
        }
        .link-extra-icon {
          position: relative;
          display: inline-flex;
          top: 2px;
          margin-left: 5px;
          width: 16px;
          height: 16px;
          -webkit-mask-image: url(${icon});
          mask-image: url(${icon});
          -webkit-mask-size: cover;
          mask-size: cover;
          background-color: var(--secondary-s1-60);
        }

        .link-wrapper:hover a {
          color: var(--secondary-s1-80);
        }

        .link-wrapper:hover .link-extra-icon {
          background-color: var(--secondary-s1-80);
        }
      `}</style>
    </div>
  )
}
