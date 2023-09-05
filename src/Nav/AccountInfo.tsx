import React, { useState } from "react"
import { useSelector, selectWalletAvatar, selectWalletName } from "redux-state"
import classnames from "classnames"
import { getZoneData } from "../Map/constants"
import AccountDropdown from "./AccountDropdown"

type AccountInfoProps = {
  hideRegion?: boolean
  disabled?: boolean
}

const regionMock = { name: "KryptoKeep", id: "4" }

export default function AccountInfo({
  hideRegion = false,
  disabled = false,
}: AccountInfoProps = {}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const name = useSelector(selectWalletName)
  const avatar = useSelector(selectWalletAvatar)
  const region = regionMock // TODO: use region for given account
  const zone = region ? getZoneData(region.id.toString()) : undefined

  if (!name) return null

  return (
    <div className="account_container row">
      {isDropdownOpen && <AccountDropdown />}
      {!hideRegion && region && (
        <div className="region_container row">
          {zone && (
            <div className="region_icon">
              <svg viewBox={`0 0 ${zone.w} ${zone.h}`}>
                <path d={zone.paths[0].data} fill="#f4d03f" />
              </svg>
            </div>
          )}
          <span className="region_label">{region.name}</span>
        </div>
      )}
      <button
        className={classnames("account_button", {
          disabled,
        })}
        type="button"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span className="account_label ellipsis">{name}</span>
        <div className="avatar" />
      </button>
      <style jsx>
        {`
          .account_container {
            position: relative;
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
            transition: color 250ms ease;
          }

          .avatar {
            width: 42px;
            height: 42px;
            margin-left: 8px;
            background: url("${avatar}");
            background-size: cover;
            border-radius: 50%;
            transform: scaleX(-1);
            border: 2px solid var(--primary-p1-100);
            transition: border-color 250ms ease;
          }

          .account_button {
            all: unset;
            display: flex;
            pointer-events: all;
            align-items: center;
            cursor: pointer;
          }
          .account_button.disabled {
            pointer-events: none;
          }

          .account_button:hover .account_label {
            color: var(--primary-p2-100);
          }

          .account_button:hover .avatar {
            border-color: var(--primary-p2-100);
          }
        `}
      </style>
    </div>
  )
}
