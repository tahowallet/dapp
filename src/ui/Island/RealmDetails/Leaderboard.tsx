import React from "react"
import placeholderLeaderboard from "shared/assets/placeholder-leaderboard.png"
// import LeaderboardList from "./LeaderboardList"

export default function Leaderboard() {
  // const [query, setQuery] = useState("")
  return (
    <>
      <div className="leaderboard_container center">
        <img
          src={placeholderLeaderboard}
          height={305}
          width={634}
          alt="Placeholder: Leaderboard"
        />
        <h1 className="placeholder_title">
          Available after <br />
          Oct 31
        </h1>
      </div>
      <style jsx>{`
        .leaderboard_container {
          width: 686px;
          height: 323px;
          padding: 16px 24px 24px 24px;
          gap: 14px;
          margin: 24px 0;
          border-radius: 24px;
          background: var(--primary-p1-40);
        }
        .placeholder_title {
          position: absolute;
          margin: 0 auto;
          color: var(--secondary-s-1100, #e4eeee);
          font: var(--text-h1);
          text-align: center;
          letter-spacing: 0.84px;
        }
      `}</style>
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
      {/* <LeaderboardList />
      <style jsx>{`
        .leaderboard_container {
          overflow-y: auto;
          scrollbar-width: none;
        }
      `}</style> */}
    </>
  )
}
