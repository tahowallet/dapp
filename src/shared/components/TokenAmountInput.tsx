import React from "react"
import { bigIntToUserAmount, userAmountToBigInt } from "shared/utils"
import {
  selectTokenBalanceByAddress,
  selectTokenSymbolByAddress,
  useDappSelector,
} from "redux-state"
import SharedInput from "./Input"
import Button from "./Button"

enum AmountErrors {
  NOT_ENOUGH_FUNDS = "Not enough funds",
  INVALID_VALUE = "Invalid value",
}

function handleValidate(
  value: string,
  balance: bigint
): { value: bigint | undefined } | { error: string } {
  const parsed = userAmountToBigInt(value)

  if (parsed !== undefined) {
    if (parsed < 0n) {
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
  disabled,
  onChange,
}: {
  label?: string
  inputLabel: string
  amount: string
  tokenAddress: string
  disabled?: boolean
  onChange: (value: string) => void
}) {
  const balance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, tokenAddress)
  )
  const symbol = useDappSelector((state) =>
    selectTokenSymbolByAddress(state, tokenAddress)
  )

  const maxAmount = bigIntToUserAmount(balance)

  return (
    <div>
      {label && (
        <div className="label">{`${label} ${maxAmount} ${symbol}`}</div>
      )}
      <SharedInput
        type="number"
        label={inputLabel}
        value={amount}
        disabled={disabled}
        onChange={onChange}
        validate={(value) => handleValidate(value, balance)}
        rightComponent={
          <Button
            type="tertiary"
            size="medium"
            isDisabled={disabled}
            onMouseDown={(event) => {
              event.preventDefault()
              onChange(maxAmount)
            }}
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
