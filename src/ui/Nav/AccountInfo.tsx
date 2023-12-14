import React, { useRef, useState } from "react"
import {
  useDappSelector,
  selectStakingRealmId,
  selectRealmById,
  selectWalletName,
} from "redux-state"
import RealmIcon from "ui/Island/Realms/RealmIcon"
import { getRealmColor } from "shared/constants"
import Avatar from "shared/components/Media/Avatar"
import AccountDropdown from "./AccountDropdown"

export default function AccountInfo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)

  const walletName = useDappSelector(selectWalletName)
  const realmId = useDappSelector(selectStakingRealmId)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))
  const color = realmId && getRealmColor(realmId)

  return (
    <div className="account_container row">
      {isDropdownOpen && (
        <AccountDropdown
          openTrigger={dropdownTriggerRef.current}
          close={() => setIsDropdownOpen(false)}
        />
      )}
      {realm && realmId && color && (
        <div className="realm_container row">
          <RealmIcon realmId={realmId} type="fill" color={color} />
          <span className="realm_label" style={{ color }}>
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
        <span className="account_label ellipsis">{walletName}</span>
        <Avatar
          width="42px"
          style={{
            marginLeft: 8,
            transform: "scaleX(-1)",
            border: "2px solid var(--primary-p1-100)",
            transition: "border-color 250ms ease",
          }}
        />
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
