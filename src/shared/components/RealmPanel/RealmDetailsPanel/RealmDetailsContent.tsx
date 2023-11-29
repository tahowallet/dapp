import React from "react"
import Panel from "shared/components/Panel"
import { RootState } from "redux-state/reducers"
import {
  selectDisplayedRealmId,
  selectRealmById,
  selectStakingRealmId,
  useDappSelector,
} from "redux-state"
import RealmDetailsHeader from "./RealmDetailsHeader"
import RealmDetailsQuests from "./RealmDetailsQuests"
import RealmDetailsRewards from "./RealmDetailsRewards"
import RealmDetailsJoin from "./RealmDetailsJoin"
import RealmDetailsStaked from "./RealmDetailsStaked"

type RealmDetailsContentProps = {
  triggerStakeSectionOpen: () => void
}

export default function RealmDetailsContent({
  triggerStakeSectionOpen,
}: RealmDetailsContentProps) {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state: RootState) =>
    selectRealmById(state, realmId)
  )
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  if (!realmId || !realm) return null

  return (
    <Panel.Section>
      <RealmDetailsHeader realmId={realmId} realm={realm} />
      <RealmDetailsQuests quests={realm?.quests} />
      <RealmDetailsRewards realmId={realmId} />
      <RealmDetailsJoin
        stakingRealmId={stakingRealmId}
        triggerStakeSectionOpen={triggerStakeSectionOpen}
      />
      <RealmDetailsStaked stakingRealmId={stakingRealmId} realmId={realmId} />
    </Panel.Section>
  )
}
