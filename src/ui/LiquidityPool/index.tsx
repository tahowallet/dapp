import React, { useEffect, useState } from "react"
import {
  fetchWalletBalance,
  joinTahoPool,
  selectEthBalace,
  selectIsWalletConnected,
  selectTahoBalace,
  selectWalletAddress,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import { isValidInputAmount, userAmountToBigInt } from "shared/utils"
import AmountInput from "shared/components/AmountInput"
import { useArbitrumProvider } from "shared/hooks"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"

export default function LiquidityPool() {
  const dispatch = useDappDispatch()
  const address = useDappSelector(selectWalletAddress)

  const provider = useArbitrumProvider()
  const isConnected = useDappSelector(selectIsWalletConnected)

  const tahoBalance = useDappSelector(selectTahoBalace)
  const ethBalance = useDappSelector(selectEthBalace)

  const [tahoAmount, setTahoAmount] = useState("")
  const [ethAmount, setEthAmount] = useState("")

  useEffect(() => {
    const fetchBalances = async () => {
      if (!provider || !address) {
        return
      }
      // TODO: wallet balances should be fetched from time to time globally
      await dispatch(fetchWalletBalance())
    }

    fetchBalances()
  }, [address, provider, dispatch])

  const joinPool = async () => {
    try {
      if (!provider || !address) {
        throw new Error("No provider or address")
      }

      const targetTahoAmount = userAmountToBigInt(+tahoAmount)
      const targetEthAmount = userAmountToBigInt(+ethAmount)

      const receipt = await dispatch(
        joinTahoPool({
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
    <Modal.Container type="map-without-overlay">
      <Modal.Content>
        <div className="content column_center">
          <div className="lp_container row">
            <div className="token column">
              <span>TAHO</span>
              <AmountInput
                label="Amount"
                amount={tahoAmount}
                maxAmount={tahoBalance}
                onChange={setTahoAmount}
              />
            </div>
            <div className="token column">
              <span>ETH</span>
              <AmountInput
                label="Amount"
                amount={ethAmount}
                maxAmount={ethBalance}
                onChange={setEthAmount}
              />
            </div>
          </div>
          <Button
            type="primary"
            size="medium"
            onClick={joinPool}
            isDisabled={
              isValidInputAmount(tahoAmount) ||
              isValidInputAmount(ethAmount) ||
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
