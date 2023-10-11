import React from "react"
import {
  selectDisplayedRealmId,
  selectRealmById,
  useDappSelector,
} from "redux-state"
import QuestsDetails from "./QuestsDetails"
import QuestsRewards from "./QuestsRewards"

export default function Quests() {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  if (!realmId || !realm) return null

  return (
    <div className="realm column">
      <QuestsDetails realmId={realmId} tokenSymbol={realm.xpToken.symbol} />
      <QuestsRewards quests={realm.quests} />
      <style jsx>{`
        .realm {
          padding-top: 32px;
          gap: 22px;
        }
      `}</style>
    </div>
  )
}
