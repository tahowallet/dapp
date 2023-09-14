import React from "react"
import { useConnect } from "shared/hooks"
import Button from "shared/components/Button"
import { useDappSelector, selectWalletName } from "redux-state"

export default function AccountDropdown() {
  const accountName = useDappSelector(selectWalletName)
  const { disconnect } = useConnect()

  return (
    <>
      <div className="account_dropdown_container column">
        <div>{accountName}</div>
        <Button type="tertiary" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
      <style jsx>{`
        .account_dropdown_container {
          position: absolute;
          top: 65px;
          right: 0;
          background: var(--primary-p1-100);
          padding: 24px;
          border-radius: 16px;
          gap: 16px;
        }
      `}</style>
    </>
  )
}
