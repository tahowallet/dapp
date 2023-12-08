import React, { ReactNode } from "react"
import Icon from "shared/components/Media/Icon"
import lightIcon from "shared/assets/icons/m/light.svg"

export default function RealmDetailsChallengeInfo({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <div className="challenge_info row_center">
        <Icon
          src={lightIcon}
          height="24px"
          width="24px"
          color="var(--primary-p2-100)"
          type="image"
          style={{ minWidth: 24 }}
        />
        <span className="challenge_info_content ellipsis">{children}</span>
      </div>
      <style jsx>{`
        .challenge_info {
          color: var(--secondary-s1-70);
          margin-bottom: 4px;
          gap: 4px;
        }
        .challenge_info_content {
          font-size: 16px;
          flex: 1;
        }
      `}</style>
    </>
  )
}
