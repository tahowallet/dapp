import React from "react"
import { LINKS, ROUTES } from "shared/constants"
import feedbackIcon from "shared/assets/icons/feedback.svg"
import NavItem, { NavItemProps } from "./NavItem"

const NAV_ITEMS: NavItemProps[] = [
  {
    path: ROUTES.HOME,
    title: "The Island",
    exact: true,
    extraInfo: "BETA",
  },
  // {
  //   path: ROUTES.REFERRALS,
  //   title: "Referrals",
  // },
  // {
  //   path: ROUTES.CLAIM.HOME,
  //   title: "Claim",
  // },
  // // TODO should be removed or defined later
  // {
  //   path: ROUTES.LP,
  //   title: "LP",
  // },
]

if (process.env.IS_COMING_SOON !== "true") {
  NAV_ITEMS.push({
    path: LINKS.FEEDBACK,
    title: "Feedback",
    exact: true,
    target: "blank",
    icon: feedbackIcon,
  })
}

function EnvironmentInfo() {
  if (process.env.USE_LOCALHOST_FORK === "true") {
    return <span>🏝️ Using localhost</span>
  }

  if (process.env.USE_TENDERLY_FORK === "true") {
    return <span>⚡️ Using fork</span>
  }

  return null
}

export default function NavItems() {
  return (
    <>
      <nav className="row">
        {NAV_ITEMS.map(({ path, title, exact, extraInfo, target, icon }) => (
          <NavItem
            key={path}
            path={path}
            title={title}
            exact={exact}
            extraInfo={extraInfo}
            target={target}
            icon={icon}
          />
        ))}
        <EnvironmentInfo />
      </nav>
      <style jsx>{`
        nav {
          gap: 48px;
        }
      `}</style>
    </>
  )
}
