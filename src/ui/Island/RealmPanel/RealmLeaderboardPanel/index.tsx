import React, { useState } from "react"
import Panel from "shared/components/Dialogs/Panel"
import TabPanel from "shared/components/Interface/TabPanel"
import LeaderboardList from "ui/Island/Leaderboard"
import LeaderboardCurrentUser from "ui/Island/Leaderboard/LeaderboardCurrentUser"

// TODO: remove this when we have more than one leaderboard type
const SHOW_LEADERBOARD_SELECTION = false

function AllTimeLeaderboard({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <LeaderboardCurrentUser style={{ marginBottom: "30px" }} />
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
    </div>
  )
}

export default function RealmLeaderboardPanel() {
  const [activeTab, setActiveTab] = useState(2)

  return (
    <Panel.Section style={{ padding: 32 }}>
      <div className="leaderboard_container">
        <h2 className="header">Leaderboard</h2>
        {SHOW_LEADERBOARD_SELECTION ? (
          <TabPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
              { label: "This week", component: null },
              { label: "Last week", component: null },
              {
                label: "All time",
                component: <AllTimeLeaderboard style={{ marginTop: "30px" }} />,
              },
            ]}
          />
        ) : (
          <AllTimeLeaderboard />
        )}
      </div>
      <style jsx>{`
        .leaderboard_container {
          width: 420px;
        }
        .header {
          font: var(--text-h2);
          font-weight: 500;
          margin-bottom: 30px;
        }
      `}</style>
    </Panel.Section>
  )
}
