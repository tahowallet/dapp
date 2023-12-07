import React from "react"
import classnames from "classnames"
import crossWhiteIcon from "shared/assets/icons/cross-white.svg"

export default function TabPanel({
  tabs,
  activeTab,
  setActiveTab,
}: {
  activeTab: number
  setActiveTab: (index: number) => void
  tabs: { label: string; component: React.ReactNode }[]
}) {
  return (
    <div>
      <ul>
        {tabs.map(({ label }, index) => (
          <li
            key={label}
            className={classnames(activeTab === index && "active")}
          >
            <button type="button" onClick={() => setActiveTab(index)}>
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div>{tabs[activeTab]?.component}</div>
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
          position: relative;
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
        li.active:after {
          content: url(${crossWhiteIcon});
          width: 17px;
          position: absolute;
          bottom: -23px;
          right: 0;
          left: 0;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}
