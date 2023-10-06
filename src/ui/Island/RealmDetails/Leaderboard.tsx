import React from "react"
import LeaderboardList from "./LeaderboardList"

export default function Leaderboard() {
  // const [query, setQuery] = useState("")
  return (
    <>
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
      <LeaderboardList />
      <style jsx>{`
        .leaderboard_container {
          overflow-y: auto;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}
