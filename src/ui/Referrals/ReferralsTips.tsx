import React from "react"
import lightIcon from "shared/assets/icons/m/light.svg"
import Icon from "shared/components/Media/Icon"

export default function ReferralsTips() {
  return (
    <div className="referrals_tip_container">
      <div className="referrals_tip row">
        <Icon src={lightIcon} width="24px" color="var(--primary-p2-100)" />
        Tips on how to get the most out of your link
      </div>
      <p>
        Share the link during TIME-TIME <br />
        Share it directly to people you know have a claim
      </p>
      <style jsx>{`
        .referrals_tip {
          color: var(--secondary-s1-60);
          align-items: center;
          gap: 4px;
          margin-bottom: 8px;
        }
        .referrals_tip_container {
          margin: 24px 0 16px;
        }
        .referrals_tip_container p {
          padding-left: 28px;
          color: var(--secondary-s1-80);
        }
      `}</style>
    </div>
  )
}
