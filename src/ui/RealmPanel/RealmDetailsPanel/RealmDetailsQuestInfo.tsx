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
      <div className="label row_center">
        <Icon
          src={lightIcon}
          height="24px"
          width="24px"
          color="var(--primary-p2-100)"
          type="image"
        />
        <span style={{ fontSize: 16 }}>{children}</span>
      </div>
      <style jsx>{`
        .label {
          color: var(--secondary-s1-70);
          margin-bottom: 4px;
          gap: 4px;
        }
      `}</style>
    </>
  )
}
