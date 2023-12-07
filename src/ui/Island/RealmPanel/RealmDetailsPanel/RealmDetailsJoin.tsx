import React from "react"
import Button from "shared/components/Interface/Button"
import Icon from "shared/components/Media/Icon"
import lightIcon from "shared/assets/icons/m/light.svg"

type RealmDetailsJoinProps = {
  stakingRealmId: string | null
  triggerStakeSectionOpen: () => void
}

export default function RealmDetailsJoin({
  stakingRealmId,
  triggerStakeSectionOpen,
}: RealmDetailsJoinProps) {
  if (stakingRealmId) return null

  return (
    <>
      <div className="join_container">
        <div style={{ marginBottom: 12 }}>
          In order to join a realm, you need to stake $TAHO
        </div>
        <div className="join_action row_center">
          <Button size="medium" onClick={() => triggerStakeSectionOpen()}>
            Stake to join realm
          </Button>
          <div className="row">
            <Icon src={lightIcon} type="image" height="24px" width="24px" />
            <p
              style={{
                color: "var(--secondary-s1-70)",
                fontSize: 16,
                width: 154,
              }}
            >
              You can only be staked in one realm
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .join_container {
          background: var(--primary-p1-80);
          padding: 24px 32px;
        }
        .join_action {
          justify-content: space-between;
          gap: 24px;
        }
      `}</style>
    </>
  )
}
