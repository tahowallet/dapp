import React from "react"
import walletIcon from "shared/assets/icons/wallet.svg"
import Button from "shared/components/Button"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import { useConnect } from "shared/hooks"

export default function BannerConnect() {
  const { connect } = useConnect()

  return (
    <RegionBanner
      label="Before joining a region, you need to connect your Taho Wallet"
      showHint
      button={
        <Button
          iconSrc={walletIcon}
          size="large"
          iconPosition="left"
          onClick={() => connect()}
        >
          Connect Walet
        </Button>
      }
    />
  )
}
