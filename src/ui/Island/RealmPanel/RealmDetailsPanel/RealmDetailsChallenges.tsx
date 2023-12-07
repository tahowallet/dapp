import React from "react"
import { Challenge } from "shared/types"
import { selectWalletName, useDappSelector } from "redux-state"
import RealmDetailsChallengeItem from "./RealmDetailsChallengeItem"
import RealmDetailsChallengeInfo from "./RealmDetailsChallengeInfo"
import RealmDetailsSection from "./RealmDetailsSection"

export default function RealmDetalsChallenges({
  challenges,
}: {
  challenges: Challenge[]
}) {
  const walletName = useDappSelector(selectWalletName)

  return (
    <>
      <div style={{ paddingInline: 32 }}>
        <RealmDetailsSection style={{ marginBottom: 0 }}>
          <div className="challenges_header">Weekly Challenges</div>
          {challenges.map(({ id, name, description, isNew }) => (
            <RealmDetailsChallengeItem
              key={id}
              id={id}
              name={name}
              description={description}
              isNew={isNew}
            />
          ))}
          <RealmDetailsChallengeInfo>
            Challenge completion determines your XP
          </RealmDetailsChallengeInfo>
          <RealmDetailsChallengeInfo>
            Challenges must be completed by: {walletName}
          </RealmDetailsChallengeInfo>
        </RealmDetailsSection>
      </div>
      <style jsx>{`
        .challenges_header {
          font-size: 16px;
          color: var(--secondary-s1-70);
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}
