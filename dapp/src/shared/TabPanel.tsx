import React, { useState } from "react"
import classnames from "classnames"

export default function TabPanel({ tabs }: { tabs: string[] }) {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div>
      <ul>
        {tabs.map((tabLabel, index) => (
          <li
            key={tabLabel}
            className={classnames(activeTab === index && "active")}
          >
            <button type="button" onClick={() => setActiveTab(index)}>
              {tabLabel}
            </button>
          </li>
        ))}
      </ul>
      <div className="content" />
      <style jsx>{`
        ul {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 24px;
          list-style: none;
          margin: 0;
          padding: 0 0 8px 0;
          border-bottom: 1px solid var(--secondary-s1-20);
        }
        li {
          color: var(--secondary-s1-60);
        }
        button {
          all: unset;
          cursor: pointer;
        }
        button:hover {
          color: var(--secondary-s1-80);
        }
        li.active {
          color: var(--secondary-s1-100);
        }

        .content {
          // FIXME: placeholder
          height: 200px;
        }
      `}</style>
    </div>
  )
}
