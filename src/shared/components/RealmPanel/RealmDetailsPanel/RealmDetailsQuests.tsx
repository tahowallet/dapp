import React from "react"
import { Quest } from "shared/types"
import { selectWalletName, useDappSelector } from "redux-state"
import RealmDetailsQuestItem from "./RealmDetailsQuestItem"
import RealmDetailsQuestInfo from "./RealmDetailsQuestInfo"
import RealmDetailsSection from "./RealmDetailsSection"

export default function RealmDetalsQuests({ quests }: { quests: Quest[] }) {
  const walletName = useDappSelector(selectWalletName)

  return (
    <>
      <RealmDetailsSection style={{ marginBottom: 0, paddingInline: 32 }}>
        <div className="quests_header">Weekly Quests</div>
        {quests.map(({ id, name, description }) => (
          <RealmDetailsQuestItem
            key={id}
            name={name}
            description={description}
          />
        ))}
        <RealmDetailsQuestInfo>
          Quest completion determines your XP
        </RealmDetailsQuestInfo>
        <RealmDetailsQuestInfo>
          Quests must be completed by: {walletName}
        </RealmDetailsQuestInfo>
      </RealmDetailsSection>
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
