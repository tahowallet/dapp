import React from "react"
import Icon from "shared/components/Media/Icon"
import lightIcon from "shared/assets/icons/m/light.svg"

type RealmDetailsStakedProps = {
  stakingRealmId: string | null
  realmId: string
}

export default function RealmDetailsStaked({
  stakingRealmId,
  realmId,
}: RealmDetailsStakedProps) {
  if (!stakingRealmId || stakingRealmId === realmId) return null

  return (
    <>
      <div className="staked_container">
        <div style={{ marginBottom: 12 }}>
          You are already staked in another realm
        </div>
        <div className="row_center">
          <Icon src={lightIcon} type="image" height="24px" width="24px" />
          <p
            style={{
              color: "var(--secondary-s1-70)",
              fontSize: 16,
            }}
          >
            You can only be staked in one realm
          </p>
        </div>
      </div>
      <style jsx>{`
        .staked_container {
          background: var(--primary-p1-80);
          padding: 24px 32px;
        }
      `}</style>
    </>
  )
}
