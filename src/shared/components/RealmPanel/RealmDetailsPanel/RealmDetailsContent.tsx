import React from "react"
import Panel from "shared/components/Panel"
import { RootState } from "redux-state/reducers"
import {
  selectDisplayedRealmId,
  selectRealmById,
  useDappSelector,
} from "redux-state"
import RealmDetailsHeader from "./RealmDetailsHeader"
import RealmDetailsQuests from "./RealmDetailsQuests"

export default function RealmDetailsContent() {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state: RootState) =>
    selectRealmById(state, realmId)
  )

  if (!realmId || !realm) return null

  return (
    <Panel.Section>
      <RealmDetailsHeader realmId={realmId} realm={realm} />
      <RealmDetailsQuests quests={realm?.quests} />
    </Panel.Section>
  )
}
