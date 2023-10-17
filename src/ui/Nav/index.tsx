import React from "react"
import Button from "shared/components/Button"
import logoIcon from "shared/assets/nav_logo.svg"
import walletIcon from "shared/assets/icons/wallet.svg"
import { useConnect, useResetTenderlyFork } from "shared/hooks"
import { ROUTES } from "shared/constants"
import NavItem from "./NavItem"
import AccountInfo from "./AccountInfo"

const NAV_ITEMS = [
  {
    path: ROUTES.HOME,
    title: "The Island",
    exact: true,
    extraInfo: "Testnet Beta",
  },
  {
    path: ROUTES.FEEDBACK,
    title: "Feedback",
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

export default function Nav(): JSX.Element {
  const { isConnected, connect } = useConnect()
  const resetTenderlyFork = useResetTenderlyFork()

  return (
    <div className="nav_container">
      <div className="nav_wrapper">
        <svg className="nav_bg">
          <defs>
            <mask id="bg_mask">
              <rect width="100%" height="100px" fill="#fff" />
              <circle cx="50%" cy="50%" r="80" fill="#000" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="var(--primary-p1-100)"
            mask="url(#bg_mask)"
          />
        </svg>
        <div className="lhs_container row">
          <nav className="row">
            {NAV_ITEMS.map(({ path, title, exact, extraInfo }) => (
              <NavItem
                key={path}
                path={path}
                title={title}
                exact={exact}
                extraInfo={extraInfo}
              />
            ))}
          </nav>
        </div>
        <div className="logo_container">
          {/* eslint-disable-next-line */}
          <div className="logo" onClick={resetTenderlyFork} />
        </div>
        <div className="rhs_container row">
          <div className="connect_wallet_btn">
            {isConnected ? (
              <AccountInfo />
            ) : (
              <Button
                type="tertiary"
                iconPosition="left"
                iconSize="large"
                iconSrc={walletIcon}
                onClick={() => connect()}
              >
                Connect wallet
              </Button>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .nav_bg {
            pointer-events: none;
            z-index: -1;
            position: absolute;
            width: 100%;
            height: 100%;
            inset: 0;
            border-radius: 48px;
          }

          .nav_container {
            position: absolute;
            top: 42px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: var(--z-navigation);
            filter: drop-shadow(0px 14px 16px rgba(7, 17, 17, 0.24));
            --logo-size: 112px;
            user-select: none;
          }

          .logo_container {
            position: absolute;
            top: 0;
            left: calc(50% - 112px / 2);
          }

          /* FIXME: replace icon */
          .logo {
            border-radius: 50%;
            margin-top: -18px;
            background: white;
            background: url(${logoIcon}) no-repeat center 0/160px;
            width: var(--logo-size);
            height: var(--logo-size);
          }

          .nav_wrapper {
            position: relative;
            display: flex;
            width: 90%;
            max-width: 1600px;
            justify-content: center;
            z-index: var(--navigation);
            border-radius: 48px;
            padding: 16px 28px;
            max-height: 72px;
          }

          .lhs_container {
            margin-right: auto;
            align-items: center;
          }

          nav {
            gap: 48px;
          }

          .rhs_container {
            margin-left: auto;
            align-items: center;
          }

          .connect_wallet_btn {
            position: relative;
            padding: 12px 8px;
          }
        `}
      </style>
    </div>
  )
}
