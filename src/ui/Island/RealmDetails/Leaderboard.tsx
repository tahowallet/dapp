import React from "react"
import classNames from "classnames"
import { keccak256 } from "ethers/lib/utils"

import Icon from "shared/components/Icon"
import crossIcon from "shared/assets/icons/plus.svg"

import { truncateAddress } from "shared/utils"

const mockData = new Array(20)
  .fill({ address: "0", xp: 240e3 })
  .map((item) => ({
    ...item,
    address: keccak256(Buffer.from(Math.random().toString())),
  }))

const format = new Intl.NumberFormat()

export default function Leaderboard() {
  // const [query, setQuery] = useState("")

  const userAddress = mockData[9].address

  const sortedResults = mockData
    .sort((a, b) => {
      if (a.address === userAddress || b.address === userAddress) {
        return a.address === userAddress ? -1 : 1
      }
      return b.xp - a.xp
    })
    .map((item, i) => ({
      ...item,
      rank: item.address === userAddress ? 18 : i,
    }))

  return (
    <div className="leaderboard_container">
      {/* <SharedInput
        value={query}
        onChange={setQuery}
        label="Look up a fellow citizen (ENS/UNS, 0xAddress)"
        style={{ "--input-bg": "transparent" }}
        rightComponent={
          <div className="wrapper">
            <Icon src={iconSearch} width="24px" />
          </div>
        }
      /> */}
      <ul>
        {sortedResults.map((item) => (
          <li key={item.rank}>
            <div
              className={classNames("leaderboard_item", {
                top_item: item.rank <= 3,
                is_user: item.rank > 10 && item.address === userAddress,
              })}
              data-rank={item.rank}
            >
              {item.rank <= 3 && (
                <Icon src={crossIcon} width="16px" color="currentColor" />
              )}
              <span>{item.rank}</span>
              <span className="address">{truncateAddress(item.address)}</span>
              <span className="xp">{format.format(item.xp)} XP</span>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .leaderboard_container {
          overflow-y: auto;
          scrollbar-width: none;
        }

        .leaderboard_item {
          padding: 0 16px 0 44px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--secondary-s1-70);
          font: 500 18px/1.2 var(--sans);
        }

        .leaderboard_item :is(.top_item, .is_user) {
          border-radius: 8px;
          padding: 12px 16px;
          color: #d0d6d6;
          font: 500 18px/38px var(--sans);
        }

        .leaderboard_item.is_user {
          background: var(--primary-p1-100);
          padding-left: 23px;
        }

        .xp {
          margin-left: auto;
        }

        .leaderboard_item[data-rank="1"] {
          color: #ffc700;
          border: 1px solid currentColor;
          background: rgba(255, 199, 0, 0.1);
        }

        .leaderboard_item[data-rank="2"] {
          color: #d99e45;
          border: 1px solid currentColor;
        }

        .leaderboard_item[data-rank="3"] {
          color: #d0d6d6;
          border: 1px solid currentColor;
        }

        .wrapper {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
