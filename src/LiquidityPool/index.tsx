import React, { useEffect, useState } from "react"
import { hexlify } from "ethers/lib/utils"
import { isValidInputAmount, userAmountToBigInt } from "../shared/utils"
import { LiquidityPoolRequest } from "../shared/types"
import AmountInput from "../shared/components/AmountInput"
import {
  allowance,
  approve,
  getBalance,
  getBalancerPoolAgentAddress,
  joinPool,
} from "../shared/contracts"
import { useSendTransaction, useWallet } from "../shared/hooks"
import Button from "../shared/components/Button"
import Modal from "../shared/components/Modal"

export default function LiquidityPool() {
  const { provider, address } = useWallet()
  const { send } = useSendTransaction()

  const [balance, setBalance] = useState(0n)
  const [tahoAmount, setTahoAmount] = useState("")

  useEffect(() => {
    if (!provider || !address) {
      return
    }

    getBalance(provider, address).then((result) => setBalance(result))
  }, [address, provider])

  const signJoinPool = async (joinRequest: LiquidityPoolRequest) => {
    if (provider && address) {
      const joinPoolTx = await joinPool(provider, address, joinRequest)
      await send(joinPoolTx)
    }
  }

  const joinPoolWithSingleToken = async () => {
    try {
      if (!provider || !address) {
        throw new Error("No provider or address")
      }

      const targetAmount = userAmountToBigInt(BigInt(parseFloat(tahoAmount)))

      const balancerPoolAgentAddress = await getBalancerPoolAgentAddress(
        provider
      )

      const allowanceValue = await allowance(
        provider,
        address,
        balancerPoolAgentAddress
      )

      if (allowanceValue < targetAmount) {
        const allowanceTx = await approve(
          provider,
          balancerPoolAgentAddress,
          targetAmount
        )
        await send(allowanceTx)
      }

      await signJoinPool({
        assets: [CONTRACT_Taho],
        maxAmountsIn: [targetAmount],
        userData: hexlify(targetAmount),
        fromInternalBalance: false,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <Modal.Container type="map-without-overlay">
      <Modal.Content>
        <div className="content column_center">
          <div className="lp_container column">
            <span>TAHO</span>
            <AmountInput
              label="Amount"
              amount={tahoAmount}
              maxAmount={balance}
              onChange={setTahoAmount}
            />
            <Button
              type="primary"
              size="medium"
              onClick={joinPoolWithSingleToken}
              isDisabled={isValidInputAmount(tahoAmount)}
            >
              Join Pool
            </Button>
          </div>
        </div>
        <style jsx>{`
          .content {
            width: 812px;
            margin: 20px;
            hight: 250px;
          }
          .lp_container {
            gap: 8px;
            align-items: center;
          }
        `}</style>
      </Modal.Content>
    </Modal.Container>
  )
}
