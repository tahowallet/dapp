import React, { CSSProperties, ReactNode } from "react"
import {
  selectDisplayedRealmId,
  selectStakingRealmId,
  useDappSelector,
} from "redux-state"

type RealmDetailsSectionProps = {
  children: ReactNode
  alwaysHasBorder?: boolean
  style?: CSSProperties
}

export default function RealmDetailsSection({
  children,
  alwaysHasBorder,
  style,
}: RealmDetailsSectionProps) {
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const displayedRealmId = useDappSelector(selectDisplayedRealmId)

  const isStakingRealm = stakingRealmId === displayedRealmId

  return (
    <>
      <div className="realm_details_section" style={style}>
        {children}
      </div>
      <style jsx>{`
        .realm_details_section {
          position: relative;
          margin-bottom: 20px;
          padding-bottom: 20px;
        }
        .realm_details_section::after {
          content: "";
          display: ${isStakingRealm || alwaysHasBorder ? "block" : "none"};
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: #071111;
          box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  )
}
