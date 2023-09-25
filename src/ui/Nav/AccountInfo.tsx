import React, { useState } from "react"
import {
  useDappSelector,
  selectWalletAvatar,
  selectWalletName,
  selectStakingRealmId,
} from "redux-state"
import { getRealmData } from "shared/constants"
import RealmIcon from "shared/components/RealmIcon"
import AccountDropdown from "./AccountDropdown"

export default function AccountInfo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const name = useDappSelector(selectWalletName)
  const avatar = useDappSelector(selectWalletAvatar)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const realm = stakingRealmId ? getRealmData(stakingRealmId) : null

  if (!name) return null

  return (
    <div className="account_container row">
      {isDropdownOpen && <AccountDropdown />}
      <div className="realm_container row">
        {realm && (
          <>
            <RealmIcon realmId={realm.id} type="fill" color={realm.color} />
            <span className="realm_label">{realm.name}</span>
          </>
        )}
      </div>
      <button type="button" onClick={() => setIsDropdownOpen((prev) => !prev)}>
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

          .realm_container {
            align-items: center;
            margin-right: 25px;
            gap: 6px;
          }

          .realm_label {
            color: ${realm ? realm.color : "#f4d03f"};
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
