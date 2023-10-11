import React from "react"
import walletIcon from "shared/assets/icons/wallet.svg"
import Button from "shared/components/Button"
import RealmBanner from "shared/components/RealmModal/RealmBanner"
import { useConnect } from "shared/hooks"

export default function BannerConnect() {
  const { connect } = useConnect()

  return (
    <RealmBanner
      label="Before joining a realm, you need to connect your Taho Wallet"
      showHint
      button={
        <Button
          iconSrc={walletIcon}
          size="large"
          iconPosition="left"
          onClick={() => connect()}
        >
          Connect Wallet
        </Button>
      }
    />
  )
}
