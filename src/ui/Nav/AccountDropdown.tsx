import React, { useEffect, useRef } from "react"
import { useConnect } from "shared/hooks"
import Button from "shared/components/Button"
import { useDappSelector, selectWalletName } from "redux-state"

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
        <div style={{ whiteSpace: "nowrap" }}>{accountName}</div>
        <Button type="tertiary" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
      <style jsx>{`
        .account_dropdown_container {
          position: absolute;
          top: 65px;
          right: 5%;
          background: var(--primary-p1-100);
          padding: 24px;
          border-radius: 16px;
          gap: 16px;
        }
      `}</style>
    </>
  )
}
