import React from "react"
import {
  userAmountToBigInt,
  bigIntToDisplayUserAmount,
  bigIntToUserAmount,
} from "shared/utils"
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
  onValidate,
}: {
  label?: string
  inputLabel: string
  amount: string
  tokenAddress: string
  disabled?: boolean
  onChange: (value: string) => void
  onValidate?: (value: boolean) => void
}) {
  const balance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, tokenAddress)
  )
  const symbol = useDappSelector((state) =>
    selectTokenSymbolByAddress(state, tokenAddress)
  )

  const validate = (value: string) => {
    const result = handleValidate(value, balance)
    const hasError = "error" in result

    onValidate?.(!hasError)
    return result
  }

  return (
    <div>
      {label && (
        <div className="label">{`${label} ${bigIntToDisplayUserAmount(
          balance,
          18,
          5
        )} ${symbol}`}</div>
      )}
      <SharedInput
        type="number"
        label={inputLabel}
        value={amount}
        disabled={disabled}
        onChange={onChange}
        validate={validate}
        rightComponent={
          <Button
            type="tertiary"
            size="medium"
            isDisabled={disabled}
            onMouseDown={(event) => {
              event.preventDefault()
              onChange(bigIntToUserAmount(balance, 18, 18))
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
