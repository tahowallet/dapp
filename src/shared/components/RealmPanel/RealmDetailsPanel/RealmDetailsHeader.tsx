import React from "react"
import Icon from "shared/components/Icon"
import iconCommunity from "shared/assets/icons/people.svg"
import { RealmCutout } from "shared/components/RealmCutout"

export default function RealmDetailsHeader() {
  return (
    <>
      <div className="realm_header_container">
        <h1 className="realm_header">Arbitrum Realm</h1>
        <div className="realm_header_content column">
          <div className="labels row">
            <div className="column">
              <span className="label row_center">
                <Icon
                  src={iconCommunity}
                  height="24px"
                  width="24px"
                  color="currentColor"
                />
                Population
              </span>
              <span className="label_value">
                {/* {separateThousandsByComma(realm?.displayedPopulation ?? 0, 0)} */}
                34,350
              </span>
            </div>
            <div className="column">
              <span className="label">This weeks reward pool</span>
              <div className="row_center" style={{ gap: 10 }}>
                <RealmCutout />
                <span className="label_value">1,000,000 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .realm_header_container {
          position: relative;
        }
        .realm_header_container::before {
          content: "";
          display: block;
          position: absolute;
          left: -210px;
          top: -336px;
          width: 572px;
          height: 437px;
          border-radius: 572px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            rgba(18, 170, 255, 0.39) 0%,
            rgba(28, 163, 238, 0) 100%
          );
        }
        .realm_header {
          margin-bottom: 14px;
          font: var(--text-h1);
        }
        .realm_header_content {
          margin-bottom: 20px;
          padding-bottom: 20px;
          position: relative;
        }
        .realm_header_content::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: #071111;
          box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.2);
        }
        .labels {
          justify-content: space-between;
        }
        .label {
          font-size: 16px;
          color: var(--secondary-s1-70);
          gap: 4px;
        }
        .label_value {
          font-size: 22px;
          font-weight: 600;
          line-height: 32px;
        }
      `}</style>
    </>
  )
}
