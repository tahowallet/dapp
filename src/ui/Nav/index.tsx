import React, { useEffect, useState } from "react"
import Button from "shared/components/Interface/Button"
import logoIcon from "shared/assets/nav_logo.svg"
import walletIcon from "shared/assets/icons/wallet.svg"
import { useConnect, useResetTenderlyFork } from "shared/hooks"
import Icon from "shared/components/Media/Icon"
import { selectWalletAddress, useDappSelector } from "redux-state"
import AccountInfo from "./AccountInfo"
import NavItems from "./NavItems"
import NavContainer from "./NavContainer"
import BraveNav from "./BraveNav"

type CachedNames = {
  [key: string]: { ens?: { name: string }; uns?: { name: string } }
}

export default function Nav(): JSX.Element {
  const { isConnected, connect } = useConnect()
  const resetTenderlyFork = useResetTenderlyFork()

  const [accountName, setAccountName] = useState<string | null>(null)
  const walletAddress = useDappSelector(selectWalletAddress)

  useEffect(() => {
    window.addEventListener("storage", () => {
      if (!walletAddress) return

      const cachedNames = localStorage.getItem("taho.cachedNames")
      if (!cachedNames) return

      const parsedCachedNames: CachedNames = JSON.parse(cachedNames)
      const { ens, uns } = parsedCachedNames[walletAddress]

      if (ens) setAccountName(ens.name)
      if (uns) setAccountName(uns.name)
    })
  }, [walletAddress])

  return (
    <>
      <NavContainer>
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
              <AccountInfo accountName={accountName} />
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
      </NavContainer>
      <BraveNav />
      <style jsx>
        {`
          .lhs_container {
            margin-right: auto;
            align-items: center;
          }

          .rhs_container {
            margin-left: auto;
            align-items: center;
            height: 40px;
          }

          .connect_wallet_btn {
            position: relative;
            padding: 12px 8px;
          }
        `}
      </style>
    </>
  )
}
