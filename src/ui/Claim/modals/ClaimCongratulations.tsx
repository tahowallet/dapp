import React from "react"
import Button from "shared/components/Button"
import CongratulationsModal from "shared/components/Modals/CongratulationsModal"
import RegionIcon from "shared/components/RegionIcon"
import { parseTahoAmount } from "shared/utils"

type CongratulationsModalProps = {
  amount: bigint
  description: string
  region: string
}

export default function ClaimCongratulations({
  amount,
  description,
  region,
}: CongratulationsModalProps) {
  return (
    <>
      <CongratulationsModal
        header="Congratulations!"
        subheader="You just claimed"
        buttons={<Button size="large">Go to settlement</Button>}
      >
        <RegionIcon
          regionId="4"
          color="var(--primary-p1-100)"
          type="circle"
          width="48px"
        />
        <div className="taho_amount">
          {parseTahoAmount(amount).toLocaleString()}
        </div>
        <p className="taho_description">{description}</p>
        <p className="taho_region">from {region}</p>
      </CongratulationsModal>
      <style jsx>{`
        .taho_amount {
          font: var(--text-h1);
          margin-top: 8px;
        }
        .taho_description {
          color: var(--secondary-s1-70);
          margin-bottom: 11px;
        }
        .taho_region {
          font-weight: 400;
        }
      `}</style>
    </>
  )
}
