import React from "react"
import { NavLink } from "react-router-dom"
import crossIcon from "../shared/assets/icons/cross.svg"

/**
 * This Link is specific to the NavItem component
 */
const NavItemLink = React.forwardRef(
  (
    {
      navigate,
      children,
      ...props
    }: { navigate: () => void } & React.HTMLProps<HTMLAnchorElement>,
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
          navigate()
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

export default function NavItem({
  path,
  title,
  exact = false,
}: {
  path: string
  title: string
  exact?: boolean
}): JSX.Element {
  return (
    <NavLink
      className="link"
      activeClassName="active"
      component={NavItemLink}
      to={path}
      exact={exact}
    >
      {title}
    </NavLink>
  )
}
