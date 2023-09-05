import React from "react"
import { bigIntToUserAmount, userAmountToBigInt } from "../utils/index"
import Button from "./Button"
import SharedInput from "./Input"

export default function AmountInput({
  label,
  amount,
  maxAmount,
  onChange,
}: {
  label: string
  amount: string
  maxAmount: bigint
  onChange: (value: string) => void
}) {
  return (
    <SharedInput
      label={label}
      value={amount}
      onChange={onChange}
      validate={(value) => {
        const parsed = parseFloat(value)

        if (Number.isNaN(+value)) {
          return { error: "Invalid format" }
        }
        if (
          !Number.isNaN(parsed) &&
          userAmountToBigInt(BigInt(parsed)) > maxAmount
        ) {
          return { error: "Insufficient balance" }
        }
        if (parsed < 0) {
          return { error: "Incorrect value" }
        }

        return { value: parsed }
      }}
      rightComponent={
        <Button
          type="tertiary"
          size="medium"
          onClick={() => onChange(bigIntToUserAmount(maxAmount).toString())}
        >
          Max
        </Button>
      }
    />
  )
}
