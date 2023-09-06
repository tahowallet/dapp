import React, { useEffect, useState } from "react"
import { encodeUserData } from "shared/utils/pool"
import {
  ETH_ADDRESS,
  isValidInputAmount,
  userAmountToBigInt,
} from "../shared/utils"
import { LiquidityPoolRequest } from "../shared/types"
import AmountInput from "../shared/components/AmountInput"
import {
  getAllowance,
  setAllowance,
  getBalance,
  getBalancerPoolAddress,
  getBalancerPoolAgentAddress,
  joinPool,
  totalSupply,
} from "../shared/contracts"
import { useSendTransaction, useWallet } from "../shared/hooks"
import Button from "../shared/components/Button"
import Modal from "../shared/components/Modal"

export default function LiquidityPool() {
  const { provider, address } = useWallet()
  const { send, isReady } = useSendTransaction()

  const [tahoBalance, setTahoBalance] = useState(0n)
  const [tahoAmount, setTahoAmount] = useState("")
  const [ethBalance, setEthBalance] = useState(0n)
  const [ethAmount, setEthAmount] = useState("")

  useEffect(() => {
    const fetchBalances = async () => {
      if (!provider || !address) {
        return
      }

      const newTahoBalance = await getBalance(provider, CONTRACT_Taho, address)
      setTahoBalance(newTahoBalance)

      const newEthBalance = (await provider.getBalance(address)).toBigInt()
      setEthBalance(newEthBalance)
    }

    fetchBalances()
  }, [address, provider])

  const signJoinPool = async (
    joinRequest: LiquidityPoolRequest,
    overrides?: { value: bigint }
  ) => {
    if (provider && address) {
      const joinPoolTx = await joinPool(
        provider,
        address,
        joinRequest,
        overrides
      )
      const receipt = await send(joinPoolTx)

      if (receipt) {
        // TODO remove when designs be ready
        // eslint-disable-next-line no-console
        console.log(receipt)
        setTahoAmount("")
        setEthAmount("")
      }
    }
  }

  const joinTahoPool = async () => {
    try {
      if (!provider || !address) {
        throw new Error("No provider or address")
      }

      const targetTahoAmount = userAmountToBigInt(+tahoAmount)
      const targetEthAmount = userAmountToBigInt(+ethAmount)

      const balancerPoolAgentAddress = await getBalancerPoolAgentAddress(
        provider
      )

      const allowanceValue = await getAllowance(
        provider,
        CONTRACT_Taho,
        address,
        balancerPoolAgentAddress
      )

      if (allowanceValue < targetTahoAmount) {
        const allowanceTx = await setAllowance(
          provider,
          CONTRACT_Taho,
          balancerPoolAgentAddress,
          targetTahoAmount
        )
        await send(allowanceTx)
      }

      const maxAmountsIn = [targetTahoAmount, targetEthAmount]

      const poolAddress = await getBalancerPoolAddress(provider)
      const lpTokenSupply = await totalSupply(provider, poolAddress)
      const userData = await encodeUserData(lpTokenSupply, maxAmountsIn)

      await signJoinPool(
        {
          assets: [CONTRACT_Taho, ETH_ADDRESS],
          maxAmountsIn,
          userData,
          fromInternalBalance: false,
        },
        {
          value: targetEthAmount,
        }
      )
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
            onClick={joinTahoPool}
            isDisabled={
              isValidInputAmount(tahoAmount) ||
              isValidInputAmount(ethAmount) ||
              !isReady
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
