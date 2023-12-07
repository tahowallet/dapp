import React, { useState } from "react"
import {
  selectDisplayedRealmVeTokenAddress,
  selectIsStakingRealmDisplayed,
  selectStakingRealmAddress,
  selectTokenBalanceByAddress,
  useDappSelector,
} from "redux-state"
import { TAHO_ADDRESS } from "shared/constants"
import TabPanel from "shared/components/Interface/TabPanel"
import StakeForm from "ui/Island/Staking/StakeForm"
import UnstakeForm from "ui/Island/Staking/UnstakeForm"
import { AccordionOutsideActions } from "shared/components/Interface/Accordion"
import RealmPanelAccordion from "."

function isFormDisabled(
  balance: bigint,
  hasStakingRealm: boolean,
  isStakingRealm: boolean
) {
  return balance === 0n || (hasStakingRealm && !isStakingRealm)
}

export default function StakeUnstakeSection({
  openedFromOutside,
  closeOpenedFromOutside,
}: AccordionOutsideActions) {
  const [activeTab, setActiveTab] = useState(0)

  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const stakingRealmContractAddress = useDappSelector(selectStakingRealmAddress)
  const isStakingRealm = useDappSelector(selectIsStakingRealmDisplayed)
  const hasStakingRealm = !!stakingRealmContractAddress

  const tahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, TAHO_ADDRESS)
  )
  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRealmVeTokenAddress)
  )

  const disabledStake = isFormDisabled(
    tahoBalance,
    hasStakingRealm,
    isStakingRealm
  )
  const disabledUnstake = isFormDisabled(
    veTahoBalance,
    hasStakingRealm,
    isStakingRealm
  )

  return (
    <RealmPanelAccordion
      title="Stake/Unstake"
      openedFromOutside={openedFromOutside}
      closeOpenedFromOutside={closeOpenedFromOutside}
    >
      <div className="stake_container">
        <TabPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            {
              label: "Stake",
              component: <StakeForm isDisabled={disabledStake} />,
            },
            {
              label: "Unstake",
              component: <UnstakeForm isDisabled={disabledUnstake} />,
            },
          ]}
        />
      </div>
      <style jsx>{`
        .stake_container {
          margin-top: -16px;
          padding: 0 32px;
        }
      `}</style>
    </RealmPanelAccordion>
  )
}
