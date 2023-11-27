import React, { useState } from "react"
import Panel from "shared/components/Panel"
import TabPanel from "shared/components/TabPanel"
import LeaderboardList from "ui/Island/RealmDetails/LeaderboardList"

const SHOW_LEADERBOARD_SELECTION = false

function AllTimeLeaderboard() {
  return (
    <>
      <div className="label row_center">
        <div className="label_text">Top 10</div>
      </div>
      <LeaderboardList />
      <style jsx>{`
        .label {
          font: var(--text-label);
          color: var(--secondary-s1-70);
        }
        .label_text {
          flex-shrink: 0;
        }
        .label::after {
          content: "";
          display: inline-block;
          flex-grow: 1;
          margin-left: 24px;
          width: 100%;
          border-bottom: 1px solid var(--secondary-s1-20);
        }
      `}</style>
    </>
  )
}

export default function RealmLeaderboardPanel() {
  const [activeTab, setActiveTab] = useState(2)

  return (
    <Panel.Container position="right">
      <Panel.Section>
        <h2>Leaderboard</h2>
        {SHOW_LEADERBOARD_SELECTION ? (
          <TabPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
              { label: "This week", component: null },
              { label: "Last week", component: null },
              { label: "All time", component: <AllTimeLeaderboard /> },
            ]}
          />
        ) : (
          <AllTimeLeaderboard />
        )}
        <style jsx>{`
          h2 {
            font: var(--text-h2);
            font-weight: 500;
            margin-bottom: 30px;
          }
        `}</style>
      </Panel.Section>
    </Panel.Container>
  )
}
