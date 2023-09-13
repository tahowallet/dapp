import React from "react"
import coinIcon from "shared/assets/taho-coin.svg"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import { useHistory } from "react-router-dom"
import routes from "shared/constants/routes"

type BannerEarnTahoProps = {
  onClose: () => void
}

export default function BannerEarnTaho({ onClose }: BannerEarnTahoProps) {
  const location = useHistory()

  const referralsButtonHandler = () => {
    onClose()
    location.push(routes.REFERRALS)
  }

  return (
    <>
      <RegionBanner
        label={
          <>
            Your <span className="taho_coin" /> $TAHO balance is 0
          </>
        }
        alignElements="center"
        noMarginBottom
        buttonProps={{
          children: "Earn TAHO with referrals",
          onClick: referralsButtonHandler,
        }}
      />
      <style jsx>
        {`
          .taho_coin {
            width: 24px;
            height: 24px;
            background-image: url(${coinIcon});
            background-size: cover;
            display: inline-block;
            transform: translateY(6px);
          }
        `}
      </style>
    </>
  )
}
