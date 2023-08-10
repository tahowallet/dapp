import React, { ReactElement } from "react"

import { truncateAddress } from "../shared/utils"
import portrait from "../shared/assets/portrait.png"
import zones from "../Map/zones-data"

export default function AccountInfo({
  address,
  name,
  avatar,
  region,
  handleClick,
}: {
  address: string
  name?: string
  avatar?: string
  region?: { name: string; id: number }
  handleClick?: () => void
}): ReactElement {
  const zone = region ? zones.find(({ id }) => region?.id === id) : undefined

  return (
    <div className="account_container row">
      {region && (
        <div className="region_container row">
          {zone && (
            <div className="region_icon">
              <svg viewBox={`0 0 ${zone.w} ${zone.h}`}>
                <path d={zone.path} fill="#f4d03f" />
              </svg>
            </div>
          )}
          <span className="region_label">{region.name}</span>
        </div>
      )}
      <button type="button" onClick={handleClick}>
        <span className="account_label ellipsis">
          {name ?? truncateAddress(address)}
        </span>
        <div className="avatar" />
      </button>
      <style jsx>
        {`
          .account_container {
            align-items: center;

            font-family: var(--sans);
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
          }

          .region_container {
            align-items: center;
            margin-right: 25px;
            gap: 6px;
          }

          .region_icon {
            width: 16px;
            height: 100%;
          }

          .region_label {
            color: #f4d03f;
          }

          .account_label {
            color: var(--secondary-s1-80);
            max-width: 150px;
          }

          .avatar {
            width: 42px;
            height: 42px;
            margin-left: 8px;
            background: url("${avatar ?? portrait}");
            background-size: cover;
            border-radius: 50%;
            transform: scaleX(-1);
            border: 2px solid var(--primary-p1-100);
            transition: border-color 0.25s ease;
          }

          button {
            all: unset;
            cursor: pointer;
            display: flex;
            align-items: center;
          }

          button:hover .account_label {
            color: var(--primary-p2-100);
          }

          button:hover .avatar {
            border-color: var(--primary-p2-100);
          }
        `}
      </style>
    </div>
  )
}
