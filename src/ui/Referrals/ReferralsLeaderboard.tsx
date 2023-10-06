import React from "react"
import { separateThousandsByComma } from "shared/utils"

const MOCKED_REFERRALS_LEADERBOARD = [
  {
    address: "abc.eth",
    bonus: 30000,
  },
  {
    address: "xyz.eth",
    bonus: 2000,
  },
]

export default function ReferralsLeaderboard() {
  return (
    <div className="referrals_leaderboard_container">
      <div className="referrals_leaderboard_header row">
        <span className="order">Nr</span>
        <span className="wide">Address</span>
        <span className="right">Bonus received</span>
      </div>
      <div className="referrals_leaderboard column">
        {MOCKED_REFERRALS_LEADERBOARD.map((referral, index) => (
          <div className="referrals_leaderboard_row row" key={referral.address}>
            <span className="order">{index + 1}</span>
            <span className="wide">{referral.address}</span>
            <span className="right">
              {separateThousandsByComma(referral.bonus)} TAHO
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .referrals_leaderboard_container {
          margin-top: 16px;
          width: 100%;
        }
        .referrals_leaderboard_container .row {
          font-size: 16px;
          gap: 18px;
        }
        .referrals_leaderboard_header {
          color: var(--secondary-s1-60);
          margin-bottom: 4px;
        }
        .referrals_leaderboard_row {
          color: var(--secondary-s1-90);
          line-height: 38px;
        }
        .right {
          text-align: right;
        }
        .wide {
          flex-grow: 1;
        }
        .order {
          width: 30px;
        }
      `}</style>
    </div>
  )
}
