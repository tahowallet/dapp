import React from "react"
import { ethers } from "ethers"
import { useAccount, useConnect, useSendTransaction } from "../shared/hooks"
import Button from "../shared/components/Button"

export default function AccountDropdown() {
  const { name, address } = useAccount()
  const { disconnect } = useConnect()
  const { send, isReady } = useSendTransaction()

  return (
    <>
      <div className="account_dropdown_container column">
        <div>{name}</div>
        <Button
          type="tertiary"
          onClick={() =>
            send({ to: address, value: ethers.utils.parseEther("0.001") })
          }
          isDisabled={!isReady}
        >
          Send
        </Button>
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
