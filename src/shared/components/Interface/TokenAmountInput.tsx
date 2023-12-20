import React, { useCallback, useEffect, useState } from "react"
import {
  userAmountToBigInt,
  bigIntToDisplayUserAmount,
  bigIntToPreciseUserAmount,
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

  if (parsed === undefined && value) {
    return { error: AmountErrors.INVALID_VALUE }
  }

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
  amount: bigint | null
  tokenAddress: string
  disabled?: boolean
  onChange: (value: bigint | null) => void
  onValidate?: (value: boolean) => void
}) {
  const [textAmount, setTextAmount] = useState("")

  const balance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, tokenAddress)
  )
  const symbol = useDappSelector((state) =>
    selectTokenSymbolByAddress(state, tokenAddress)
  )

  const validate = useCallback(
    (value: string) => {
      const result = handleValidate(value, balance)
      const hasError = "error" in result

      onValidate?.(!hasError)
      return result
    },
    [balance, onValidate]
  )

  const internalOnChange = useCallback(
    (newValue: string) => {
      setTextAmount(newValue)

      const newValueBigIntAmount =
        newValue === "" ? null : userAmountToBigInt(newValue) ?? 0n

      const balanceTextAmount = bigIntToPreciseUserAmount(balance)

      // As we may be loosing some precision, we need to compare the values.
      // Clicking "Max" button may result in bigint that is too big to be
      // represented as a float number. In this case we need to compare values to
      // not override the external value that stores the bigint using greater precision.
      if (
        newValueBigIntAmount !== amount &&
        (newValue !== balanceTextAmount || newValueBigIntAmount === balance)
      ) {
        onChange(newValueBigIntAmount)
      }
    },
    [amount, balance, onChange]
  )

  useEffect(() => {
    // Allow clearing the input from parent componentthis should be the only case
    // where parent component is allowed to change the value
    if (amount === null) {
      setTextAmount("")
    }
  }, [amount])

  const parsedBalance = bigIntToDisplayUserAmount(balance, 18, 4)

  return (
    <div>
      {label && (
        <div className="label">{`${label} ${parsedBalance} ${symbol}`}</div>
      )}
      <SharedInput
        type="number"
        label={inputLabel}
        value={textAmount}
        disabled={disabled}
        onChange={internalOnChange}
        validate={validate}
        rightComponent={
          <Button
            type="tertiary"
            size="medium"
            isDisabled={disabled}
            onMouseDown={(event) => {
              event.preventDefault()
              setTextAmount(bigIntToPreciseUserAmount(balance))
              onChange(balance)
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
