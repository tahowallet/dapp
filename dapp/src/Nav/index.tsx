import React from "react"
import { useHistory } from "react-router-dom"

import logoIcon from "../shared/assets/nav_logo.svg"
import walletIcon from "../shared/assets/icons/wallet.svg"
import Icon from "../shared/Icon"

export default function Nav(): JSX.Element {
  const location = useHistory()

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
        <div className="lhs_container">
          <nav>
            <button
              onClick={() => location.replace("/")}
              className="link active"
              role="link"
              type="button"
            >
              Map
            </button>
            <button className="link" role="link" type="button">
              Referrals
            </button>
            <button
              onClick={() => location.replace("/claim")}
              className="link"
              role="link"
              type="button"
            >
              Claim
            </button>
          </nav>
        </div>
        <div className="logo_container">
          <div className="logo" />
        </div>
        <div className="rhs_container">
          <button className="connect_wallet_btn" type="button">
            <Icon src={walletIcon} width="24px" color="currentColor" />
            Connect Taho wallet
          </button>
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
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          nav {
            display: flex;
            flex-direction: row;
            gap: 36px;
          }

          .rhs_container {
            margin-left: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .connect_wallet_btn {
            color: var(--primary-p2-100);
            font-family: var(--sans);
            line-height: 24px;
            appearance: none;
            background: none;
            outline: none;
            display: flex;
            border: none;
            gap: 8px;
            padding: 12px 8px;
            cursor: pointer;
          }

          .link {
            padding: 4px 8px;
            appearance: none;
            font-family: var(--sans);
            background: none;
            border: none;
            line-height: 24px;
            outline: none;
            color: var(--secondary-s1-50);
          }

          .link:hover,
          .link:focus {
            color: var(--secondary-s1-80);
          }

          .link.active {
            color: var(--off-white);
          }
        `}
      </style>
    </div>
  )
}
