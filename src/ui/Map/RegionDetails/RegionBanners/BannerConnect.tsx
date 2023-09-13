import React from "react"
import walletIcon from "shared/assets/icons/wallet.svg"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import { useConnect } from "shared/hooks"

export default function BannerConnect() {
  const { isConnected, connect } = useConnect()

  if (isConnected) return null

  return (
    <RegionBanner
      label="Before joining a region, you need to connect your Taho Wallet"
      buttonProps={{
        iconSrc: walletIcon,
        type: "primary",
        size: "large",
        iconPosition: "left",
        children: "Connect Wallet",
        onClick: () => connect(),
      }}
    />
  )
}
