import React, { useRef, useState } from "react"
import {
  useDappSelector,
  selectWalletAvatar,
  selectWalletName,
  selectStakingRealmId,
} from "redux-state"
import { getRealmDetails } from "shared/constants"
import RealmIcon from "shared/components/RealmIcon"
import AccountDropdown from "./AccountDropdown"

export default function AccountInfo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)

  const name = useDappSelector(selectWalletName)
  const avatar = useDappSelector(selectWalletAvatar)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const realm = stakingRealmId ? getRealmDetails(stakingRealmId) : null

  if (!name) return null

  return (
    <div className="account_container row">
      {isDropdownOpen && (
        <AccountDropdown
          openTrigger={dropdownTriggerRef.current}
          close={() => setIsDropdownOpen(false)}
        />
      )}
      {realm && (
        <div className="realm_container row">
          <RealmIcon realmId={realm.id} type="fill" color={realm.color} />
          <span className="realm_label" style={{ color: realm.color }}>
            {realm.name}
          </span>
        </div>
      )}
      <button
        className="account"
        type="button"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        ref={dropdownTriggerRef}
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

          .account > * {
            pointer-events: none;
          }

          .realm_container {
            align-items: center;
            margin-right: 25px;
            gap: 6px;
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
