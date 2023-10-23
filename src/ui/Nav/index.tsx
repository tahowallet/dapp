import React from "react"
import Button from "shared/components/Button"
import logoIcon from "shared/assets/nav_logo.svg"
import walletIcon from "shared/assets/icons/wallet.svg"
import { useConnect, useResetTenderlyFork } from "shared/hooks"
import Icon from "shared/components/Icon"
import AccountInfo from "./AccountInfo"
import NavItems from "./NavItems"

export default function Nav(): JSX.Element {
  const { isConnected, connect } = useConnect()
  const resetTenderlyFork = useResetTenderlyFork()

  return (
    <div className="nav_container">
      <div className="nav_wrapper">
        <div className="lhs_container row">
          <Icon
            src={logoIcon}
            type="image"
            height="32px"
            width="154px"
            onClick={resetTenderlyFork}
            style={{ marginRight: 70 }}
          />
          <NavItems />
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
                isDisabled={process.env.IS_COMING_SOON === "true"}
              >
                Connect wallet
              </Button>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .nav_container {
            position: absolute;
            top: 0;
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

          .nav_wrapper {
            position: relative;
            display: flex;
            width: 100%;
            justify-content: center;
            z-index: var(--navigation);
            padding: 20px 28px;
            max-height: 72px;
            background: var(--primary-p1-100);
          }

          .lhs_container {
            margin-right: auto;
            align-items: center;
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
