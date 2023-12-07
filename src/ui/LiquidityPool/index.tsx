import React, { useState } from "react"
import {
  joinTahoPool,
  selectIsWalletConnected,
  selectWalletAddress,
  stopTrackingTransactionStatus,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import { isValidInputAmount } from "shared/utils"
import { useArbitrumProvider } from "shared/hooks"
import Button from "shared/components/Interface/Button"
import Modal from "shared/components/Dialogs/Modal"
import TokenAmountInput from "shared/components/Interface/TokenAmountInput"
import { ETH_ADDRESS, TAHO_ADDRESS } from "shared/constants"

const LP_TX_ID = "joinLP"

export default function LiquidityPool() {
  const dispatch = useDappDispatch()
  const address = useDappSelector(selectWalletAddress)

  const provider = useArbitrumProvider()
  const isConnected = useDappSelector(selectIsWalletConnected)

  const [tahoAmount, setTahoAmount] = useState<bigint | null>(null)
  const [ethAmount, setEthAmount] = useState<bigint | null>(null)

  const joinPool = async () => {
    try {
      if (!provider || !address) {
        throw new Error("No provider or address")
      }

      if (tahoAmount === null || ethAmount === null) {
        throw new Error("Invalid token amount")
      }

      const receipt = await dispatch(
        joinTahoPool({
          id: LP_TX_ID,
          tahoAmount,
          ethAmount,
        })
      )

      if (receipt) {
        // TODO remove when designs be ready
        // eslint-disable-next-line no-console
        console.log(receipt)
        dispatch(stopTrackingTransactionStatus(LP_TX_ID))
        setTahoAmount(null)
        setEthAmount(null)
      }
    } catch (err) {
      // TODO Add error handing
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <Modal.Container type="island-without-overlay">
      <Modal.AnimatedContent>
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
      </Modal.AnimatedContent>
    </Modal.Container>
  )
}
