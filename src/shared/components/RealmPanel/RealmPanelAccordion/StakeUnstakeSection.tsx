import React, { useState } from "react"
import {
  selectDisplayedRealmVeTokenAddress,
  selectIsStakingRealmDisplayed,
  selectStakingRealmAddress,
  selectTokenBalanceByAddress,
  useDappSelector,
} from "redux-state"
import { TAHO_ADDRESS } from "shared/constants"
import TabPanel from "shared/components/TabPanel"
import StakeForm from "ui/Island/RealmDetails/StakingForms/StakeForm"
import UnstakeForm from "ui/Island/RealmDetails/StakingForms/UnstakeForm"
import RealmPanelAccordion from "."

function isFormDisabled(
  balance: bigint,
  hasStakingRealm: boolean,
  isStakingRealm: boolean
) {
  return balance === 0n || (hasStakingRealm && !isStakingRealm)
}

export default function StakeUnstakeSection() {
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
    <RealmPanelAccordion title="Stake/Unstake">
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
    </RealmPanelAccordion>
  )
}
