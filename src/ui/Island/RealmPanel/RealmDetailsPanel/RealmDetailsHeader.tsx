import React from "react"
import Icon from "shared/components/Media/Icon"
import iconCommunity from "shared/assets/icons/people.svg"
import RealmIcon from "ui/Island/Realms/RealmIcon"
import {
  getRadialGradientFromRealmColor,
  separateThousandsByComma,
} from "shared/utils"
import {
  WEEKLY_XP_ALLOCATION,
  WEEKLY_XP_BOOST,
  getRealmMapData,
} from "shared/constants"
import { RealmData } from "shared/types"
import RealmDetailsSection from "./RealmDetailsSection"

type RealmDetailsHeaderProps = {
  realmId: string
  realm: RealmData
}

export default function RealmDetailsHeader({
  realmId,
  realm,
}: RealmDetailsHeaderProps) {
  const { color } = getRealmMapData(realmId)

  return (
    <>
      <div className="realm_header_container">
        <h1 className="realm_header" style={{ color }}>
          {realm?.name} Realm
        </h1>
        <RealmDetailsSection
          alwaysHasBorder={process.env.IS_BETA_CLOSED !== "true"}
        >
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
                {separateThousandsByComma(realm.displayedPopulation ?? 0, 0)}
              </span>
            </div>
            <div className="column">
              <span className="label">This weeks reward pool</span>
              <div
                className="row_center"
                style={{ gap: 10, justifyContent: "end" }}
              >
                <RealmIcon
                  type="circle"
                  realmId={realmId}
                  color="var(--primary-100)"
                  width="24px"
                />
                <span className="label_value">
                  {separateThousandsByComma(
                    /* realm.xpAllocatable || */ WEEKLY_XP_ALLOCATION *
                      WEEKLY_XP_BOOST,
                    0
                  )}{" "}
                  XP
                </span>
              </div>
            </div>
          </div>
        </RealmDetailsSection>
      </div>
      <style jsx>{`
        .realm_header_container {
          position: relative;
          padding: 32px 32px 0;
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
