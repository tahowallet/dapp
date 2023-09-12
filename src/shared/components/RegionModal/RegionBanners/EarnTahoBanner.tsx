import React from "react"
import coinIcon from "shared/assets/taho-coin.svg"
import RegionBanner from "shared/components/RegionModal/RegionBanner"

export default function EarnTahoBanner() {
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
        buttonProps={{ children: "Earn TAHO with referrals" }}
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
