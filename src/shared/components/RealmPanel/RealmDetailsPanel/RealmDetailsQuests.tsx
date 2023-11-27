import React from "react"
import { Quest } from "shared/types"
import { selectWalletName, useDappSelector } from "redux-state"
import RealmDetailsQuestItem from "./RealmDetailsQuestItem"
import RealmDetailsQuestInfo from "./RealmDetailsQuestInfo"

export default function RealmDetalsQuests({ quests }: { quests: Quest[] }) {
  const walletName = useDappSelector(selectWalletName)

  return (
    <>
      <div>
        <div className="quests_header">Weekly Quests</div>
        {quests.map(({ name, description }) => (
          <RealmDetailsQuestItem name={name} description={description} />
        ))}
        <RealmDetailsQuestInfo>
          Quest completion determines your XP
        </RealmDetailsQuestInfo>
        <RealmDetailsQuestInfo>
          Quests must be completed by: {walletName}
        </RealmDetailsQuestInfo>
      </div>
      <style jsx>{`
        .quests_header {
          font-size: 16px;
          color: var(--secondary-s1-70);
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}
