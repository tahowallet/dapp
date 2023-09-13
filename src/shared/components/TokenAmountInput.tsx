import React, { useEffect, useState } from "react"
import {
  ETH_ADDRESS,
  bigIntToUserAmount,
  userAmountToBigInt,
} from "shared/utils"
import { useSelector } from "react-redux"
import { selectWalletAddress } from "redux-state"
import { useArbitrumProvider } from "shared/hooks"
import { getBalance, getSymbol } from "shared/contracts"
import SharedInput from "./Input"
import Button from "./Button"

enum AmountErrors {
  NOT_ENOUGH_FUNDS = "Not enough funds",
  INVALID_VALUE = "Invalid value",
}

function handleValidate(
  value: string,
  balance: bigint
): { value: unknown } | { error: string } {
  const parsed = userAmountToBigInt(value)

  if (parsed) {
    if (parsed < 0) {
      return { error: AmountErrors.INVALID_VALUE }
    }
    if (parsed > balance) {
      return { error: AmountErrors.NOT_ENOUGH_FUNDS }
    }
  }

  return { value: parsed }
}

export default function TokenAmountInput({
  label,
  inputLabel,
  amount,
  tokenAddress,
  onChange,
}: {
  label?: string
  inputLabel: string
  amount: string
  tokenAddress: string
  onChange: (value: string) => void
}) {
  const address = useSelector(selectWalletAddress)

  const provider = useArbitrumProvider()

  const [balance, setBalance] = useState(0n)
  const [symbol, setSymbol] = useState("")

  const maxAmount = bigIntToUserAmount(balance)

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!provider) {
        return
      }

      if (tokenAddress === ETH_ADDRESS) {
        const newEthBalance = (await provider.getBalance(address)).toBigInt()
        setBalance(newEthBalance)
        setSymbol("ETH")
      } else {
        const newBalance = await getBalance(provider, tokenAddress, address)
        setBalance(newBalance)

        const newSymbol = await getSymbol(provider, tokenAddress)
        setSymbol(newSymbol)
      }
    }

    fetchTokenInfo()
  }, [address, provider, tokenAddress])

  return (
    <div>
      {label && (
        <div className="label">{`${label} ${maxAmount} ${symbol}`}</div>
      )}
      <SharedInput
        type="number"
        label={inputLabel}
        value={amount}
        onChange={onChange}
        validate={(value) => handleValidate(value, balance)}
        rightComponent={
          <Button
            type="tertiary"
            size="medium"
            onClick={() => onChange(maxAmount)}
          >
            Max
          </Button>
        }
      />

      <style jsx>{`
        .label {
          font: var(--text-label);
          color: var(--secondary-s1-70);
        }
      `}</style>
    </div>
  )
}
