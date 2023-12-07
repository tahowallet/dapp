import React, { useEffect, useRef } from "react"
import { useConnect } from "shared/hooks"
import Button from "shared/components/Interface/Button"
import { useDappSelector, selectWalletName } from "redux-state"
import Icon from "shared/components/Media/Icon"
import disconnectIcon from "shared/assets/icons/m/disconnect.svg"
import arbitrumIcon from "shared/assets/partners/arbitrum.svg"

type AccountDropdownProps = {
  close: () => void
  openTrigger: HTMLButtonElement | null
}

export default function AccountDropdown({
  openTrigger,
  close,
}: AccountDropdownProps) {
  const accountName = useDappSelector(selectWalletName)
  const { disconnect } = useConnect()

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!dropdownRef.current || !openTrigger) return
      if (e.target !== dropdownRef.current && e.target !== openTrigger) close()
    }

    window.addEventListener("click", closeDropdown)

    return () => window.removeEventListener("click", closeDropdown)
  }, [dropdownRef, openTrigger, close])

  return (
    <>
      <div className="account_dropdown_container column" ref={dropdownRef}>
        <div style={{ marginBottom: 8 }}>
          <p className="account_dropdown_label">Account</p>
          <p style={{ whiteSpace: "nowrap" }}>{accountName}</p>
        </div>
        <div style={{ marginBottom: 32 }}>
          <p className="account_dropdown_label">Network</p>
          <div className="row_center">
            <Icon src={arbitrumIcon} type="image" height="20px" width="19px" />
            <p style={{ whiteSpace: "nowrap", marginLeft: 4 }}>
              Sepolia testnet
            </p>
          </div>
        </div>
        <Button type="reject" onClick={() => disconnect()}>
          <Icon
            src={disconnectIcon}
            type="image"
            color="currentColor"
            height="24px"
            width="24px"
          />
          <p style={{ marginLeft: 2 }}>Disconnect</p>
        </Button>
      </div>
      <style jsx>{`
        .account_dropdown_container {
          position: absolute;
          top: 65px;
          right: 3%;
          background: var(--primary-p1-100);
          padding: 16px 24px;
          border-radius: 16px;
          min-width: 217px;
        }
        .account_dropdown_label {
          font-size: 16px;
          color: var(--secondary-s1-80);
          line-height: 24px;
        }
      `}</style>
    </>
  )
}
