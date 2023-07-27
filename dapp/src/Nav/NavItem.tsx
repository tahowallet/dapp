import React from "react"
import { NavLink } from "react-router-dom"
import starIcon from "../shared/assets/icons/star.svg"

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
    <>
      <NavLink
        className="link"
        activeClassName="active"
        to={path}
        exact={exact}
      >
        {title}
      </NavLink>
      <style jsx global>
        {`
          .link {
            position: relative;
            color: var(--secondary-s1-50);
            font-family: Segment;
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
          }

          .link:hover,
          .link:focus {
            color: var(--secondary-s1-80);
          }

          .link.active {
            color: var(--secondary-s1-100);
          }

          .active:after {
            content: url(${starIcon});
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
  )
}
