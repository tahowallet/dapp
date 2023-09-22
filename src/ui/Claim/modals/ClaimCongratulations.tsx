import React from "react"
import Button from "shared/components/Button"
import CongratulationsModal from "shared/components/Modals/CongratulationsModal"
import RegionIcon from "shared/components/RegionIcon"
import { getRegionData } from "shared/constants"

type ClaimCongratulationsProps = {
  amount: number
  description: string
  regionId: string
  close: () => void
}

export default function ClaimCongratulations({
  amount,
  description,
  regionId,
  close,
}: ClaimCongratulationsProps) {
  const { name: regionName } = getRegionData(regionId)

  return (
    <>
      <CongratulationsModal
        header="Congratulations!"
        subheader="You just claimed"
        buttons={
          <Button size="large" onClick={close}>
            Go to settlement
          </Button>
        }
        close={close}
      >
        <RegionIcon
          regionId={regionId}
          color="var(--primary-p1-100)"
          type="circle"
          width="48px"
        />
        <div className="taho_amount">{amount}</div>
        <p className="taho_description">{description}</p>
        <p className="taho_region">from {regionName}</p>
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
