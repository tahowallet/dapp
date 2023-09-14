import React from "react"
import coinIcon from "shared/assets/taho-coin.svg"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import { useHistory } from "react-router-dom"
import routes from "shared/constants/routes"
import Button from "shared/components/Button"

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
    <>
      <RegionBanner
        label={
          <>
            Your <span className="taho_coin" /> $TAHO balance is 0
          </>
        }
        style={{ marginTop: 24, marginBottom: 0 }}
        button={
          <Button onClick={referralsButtonHandler}>
            Earn TAHO with referrals
          </Button>
        }
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
