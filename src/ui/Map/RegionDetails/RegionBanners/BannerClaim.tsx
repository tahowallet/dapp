import React from "react"
import Button from "shared/components/Button"
import TahoAmount from "shared/components/TahoAmount"
import { useHistory } from "react-router-dom"
import routes from "shared/constants/routes"

type BannerClaimProps = {
  close: () => void
}

export default function BannerClaim({ close }: BannerClaimProps) {
  const location = useHistory()

  const claimButtonHandler = () => {
    close()
    location.push(routes.CLAIM.HOME)
  }

  return (
    <>
      <div className="claim_banner">
        <p className="claim_banner_label">Congratulations, you can claim</p>
        <div className="taho_amount_container row">
          <TahoAmount amount={327000n} size="large" fixedWidth={false} />
          <Button size="large" onClick={claimButtonHandler}>
            Claim TAHO
          </Button>
        </div>
      </div>
      <style jsx>
        {`
          .claim_banner {
            padding: 22px 20px 32px;
            background-color: var(--primary-p1-40);
            justify-content: space-between;
            align-items: start;
            gap: 24px;
            margin-bottom: 36px;
            width: 671px;
            border-radius: 8px;
          }

          .claim_banner_label {
            color: var(--secondary-s1-100);
            margin-bottom: 17px;
          }

          .taho_amount_container {
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 24px;
            flex-shrink: 0;
            border-radius: 88px;
            background: var(--primary-p1-100);
          }
        `}
      </style>
    </>
  )
}
