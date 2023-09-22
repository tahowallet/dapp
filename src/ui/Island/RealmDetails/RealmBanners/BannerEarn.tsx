import React from "react"
import coinIcon from "shared/assets/taho-coin.svg"
import RegionBanner from "shared/components/RealmModal/RealmBanner"
import { useHistory } from "react-router-dom"
import routes from "shared/constants/routes"
import Button from "shared/components/Button"
import Icon from "shared/components/Icon"

type BannerEarnProps = {
  close: () => void
}

export default function BannerEarn({ close }: BannerEarnProps) {
  const location = useHistory()

  const referralsButtonHandler = () => {
    close()
    location.push(routes.REFERRALS)
  }

  return (
    <RegionBanner
      label={
        <>
          Your{" "}
          <Icon
            src={coinIcon}
            width="24px"
            height="24px"
            type="image"
            style={{ transform: "translateY(5px)" }}
          />{" "}
          $TAHO balance is 0
        </>
      }
      showHint
      style={{ marginTop: 24, marginBottom: 0 }}
      button={
        <Button onClick={referralsButtonHandler}>
          Earn TAHO with referrals
        </Button>
      }
    />
  )
}
