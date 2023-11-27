import React, { ReactNode } from "react"
import Icon from "shared/components/Icon"
import lightIcon from "shared/assets/icons/m/light.svg"

export default function RealmDetailsQuestInfo({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <div className="row_center" style={{ gap: 4 }}>
        <Icon
          src={lightIcon}
          height="24px"
          width="24px"
          color="var(--primary-p2-100)"
          type="image"
        />
        <span className="label">{children}</span>
      </div>
      <style jsx>{`
        .label {
          font-size: 16px;
          color: var(--secondary-s1-70);
          margin-bottom: 4px;
        }
      `}</style>
    </>
  )
}
