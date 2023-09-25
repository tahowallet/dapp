import React, { useState } from "react"
import {
  joinTahoPool,
  selectIsWalletConnected,
  selectWalletAddress,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import { isValidInputAmount, userAmountToBigInt } from "shared/utils"
import { useArbitrumProvider } from "shared/hooks"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"
import TokenAmountInput from "shared/components/TokenAmountInput"
import { ETH_ADDRESS, TAHO_ADDRESS } from "shared/constants"

export default function LiquidityPool() {
  const dispatch = useDappDispatch()
  const address = useDappSelector(selectWalletAddress)

  const provider = useArbitrumProvider()
  const isConnected = useDappSelector(selectIsWalletConnected)

  const [tahoAmount, setTahoAmount] = useState("")
  const [ethAmount, setEthAmount] = useState("")

  const joinPool = async () => {
    try {
      if (!provider || !address) {
        throw new Error("No provider or address")
      }

      const targetTahoAmount = userAmountToBigInt(tahoAmount)
      const targetEthAmount = userAmountToBigInt(ethAmount)

      if (!targetTahoAmount || !targetEthAmount) {
        throw new Error("Invalid token amount")
      }

      const receipt = await dispatch(
        joinTahoPool({
          id: "joinLP",
          tahoAmount: targetTahoAmount,
          ethAmount: targetEthAmount,
        })
      )

      if (receipt) {
        // TODO remove when designs be ready
        // eslint-disable-next-line no-console
        console.log(receipt)
        setTahoAmount("")
        setEthAmount("")
      }
    } catch (err) {
      // TODO Add error handing
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <Modal.Container type="island-without-overlay">
      <Modal.Content>
        <div className="content column_center">
          <div className="lp_container row">
            <div className="token column">
              <TokenAmountInput
                label="Wallet balance:"
                inputLabel="Amount"
                amount={tahoAmount}
                tokenAddress={TAHO_ADDRESS}
                onChange={setTahoAmount}
              />
            </div>
            <div className="token column">
              <TokenAmountInput
                label="Wallet balance:"
                inputLabel="Amount"
                amount={ethAmount}
                tokenAddress={ETH_ADDRESS}
                onChange={setEthAmount}
              />
            </div>
          </div>
          <Button
            type="primary"
            size="medium"
            onClick={joinPool}
            isDisabled={
              !isValidInputAmount(tahoAmount) ||
              !isValidInputAmount(ethAmount) ||
              !isConnected
            }
          >
            Join Pool
          </Button>
        </div>
        <style jsx>{`
          .content {
            width: 812px;
            margin: 20px;
            height: 250px;
          }
          .lp_container {
            gap: 16px;
          }
          .token {
            gap: 8px;
            align-items: center;
          }
        `}</style>
      </Modal.Content>
    </Modal.Container>
  )
}
