import React from "react"
import Icon from "shared/components/Icon"
import iconCommunity from "shared/assets/icons/people.svg"
import {
  selectDisplayedRealmId,
  selectRealmById,
  useDappSelector,
} from "redux-state"
import { RootState } from "redux-state/reducers"
import RealmIcon from "shared/components/RealmIcon"
import {
  getRadialGradientFromRealmColor,
  separateThousandsByComma,
} from "shared/utils"
import { WEEKLY_XP_ALLOCATION, getRealmMapData } from "shared/constants"

export default function RealmDetailsHeader() {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state: RootState) =>
    selectRealmById(state, realmId)
  )

  if (!realmId || !realm) return null

  const { color } = getRealmMapData(realmId)

  return (
    <>
      <div className="realm_header_container">
        <h1 className="realm_header" style={{ color }}>
          {realm?.name} Realm
        </h1>
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
                {separateThousandsByComma(realm?.displayedPopulation ?? 0, 0)}
              </span>
            </div>
            <div className="column">
              <span className="label">This weeks reward pool</span>
              <div className="row_center" style={{ gap: 10 }}>
                <RealmIcon
                  type="circle"
                  realmId={realmId}
                  color="var(--primary-100)"
                  width="24px"
                />
                <span className="label_value">
                  {separateThousandsByComma(
                    /* realm?.xpAllocatable || */ WEEKLY_XP_ALLOCATION,
                    0
                  )}{" "}
                  XP
                </span>
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
          background: ${getRadialGradientFromRealmColor(color)};
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
