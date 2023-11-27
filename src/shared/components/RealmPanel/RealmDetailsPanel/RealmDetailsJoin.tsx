import React from "react"
import Button from "shared/components/Button"
import Icon from "shared/components/Icon"
import lightIcon from "shared/assets/icons/m/light.svg"

export default function RealmDetailsJoin({
  stakingRealmId,
}: {
  stakingRealmId: string | null
}) {
  if (stakingRealmId) return null

  const handleStakeJoin = () => {} // TODO: implement logic after "Stake/Unstake" is created

  return (
    <>
      <div className="join_container">
        <div style={{ marginBottom: 12 }}>
          In order to join a realm, you need to stake $TAHO
        </div>
        <div className="join_action row_center">
          <Button size="medium" onClick={handleStakeJoin}>
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
