import classNames from "classnames"
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { NUMBER_INPUT_REGEX } from "shared/constants"

type SharedInputProps = {
  label: string
  type?: "text" | "number"
  disabled?: boolean
  value: string
  placeholder?: string
  onChange?: (value: string) => void
  validate?: (value: string) => { value: unknown } | { error: string }
  rightComponent?: React.ReactNode
  style?: React.CSSProperties & Record<string, string>
}

export default function SharedInput({
  onChange,
  validate = (validatedValue) => ({ value: validatedValue }),
  label,
  type = "text",
  value,
  placeholder = " ",
  disabled = false,
  rightComponent = null,
  style = {},
}: SharedInputProps) {
  const [error, setError] = useState("")
  const isTypeNumber = useMemo(() => type === "number", [type])

  const handleError = useCallback(
    (newValue: string) => {
      const validatedData = validate(newValue)

      if ("error" in validatedData) {
        setError(validatedData.error)
      } else {
        setError("")
      }
    },
    [validate]
  )

  useEffect(() => {
    handleError(value)
  }, [handleError, value])

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
      if (inputValue === "") onChange?.("")

      const isNumberInput = NUMBER_INPUT_REGEX.test(inputValue)

      // If we have number input, entering letter won't update input value
      if (!isNumberInput && isTypeNumber) return

      onChange?.(inputValue)
    },
    [onChange, isTypeNumber]
  )

  return (
    <div
      style={style}
      className={classNames("input_group", { error, disabled })}
    >
      <div className="input_box">
        <input
          type="text" // always have "text" input to solve double "-" char problem occuring in "number" input
          inputMode={isTypeNumber ? "numeric" : "text"} // solving numeric keyboard on mobile devices
          step="any"
          min={isTypeNumber ? "0" : undefined}
          className={classNames({ input_number: isTypeNumber })}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleInputChange}
        />
        <span className="input_label">{label}</span>
        <div role="presentation" className="input_notch">
          <span>{label}</span>
        </div>
        {rightComponent}
      </div>
      <div className="error_msg">{error}</div>
      <style jsx>{`
        input {
          all: unset;
          box-sizing: border-box;
          appearance: textfield;
          padding: 12px 16px;
          width: 100%;
          position: relative;
        }

        input::placeholder {
          color: var(--green-5);
          opacity: 1;
        }

        .error_msg {
          margin-top: 4px;
          font: var(--text-body-s);
          color: var(--semantic-error);
        }

        .input_group {
          position: relative;
          padding: 8px 0 16px;
          --border-color: var(--primary-p1-60);
          --focus-label-color: var(--secondary-s1-50);
          --label-color: var(--green-5);
          --input-bg: var(--input-bg, #093432);
        }

        .input_group.error {
          --border-color: var(--semantic-error);
          --label-color: var(--semantic-error);
          --focus-label-color: var(--semantic-error);
        }

        .input_group.disabled {
          --border-color: var(--primary-p1-60);
          --label-color: var(--primary-p1-40);
          --focus-label-color: var(--semantic-error);
          --input-bg: var(--primary-p1-80);
        }

        .input_box {
          box-sizing: border-box;
          display: flex;
          border-radius: 4px;
          border: 1.5px solid var(--border-color);
          border-top: none;
          background: var(--input-bg);
          padding-right: 16px;
          position: relative;
        }

        .input_label {
          position: absolute;
          left: 16px;
          top: 12px;
          color: var(--label-color);
          font: var(--text-h5);
          transition: all 0.1s ease-out;
          user-select: none;
          pointer-events: none;
        }

        input:focus ~ .input_label,
        input:not(:placeholder-shown) ~ .input_label {
          transform: translateY(-125%);
          padding: 0 4px;
          font: var(--text-label-alt);
          color: var(--focus-label-color);
        }

        .input_notch {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          user-select: none;
          pointer-events: none;
          --border: 1.5px solid var(--border-color);
        }

        input:focus ~ .input_notch,
        input:not(:placeholder-shown) ~ .input_notch {
          --focused-border: 1.5px solid transparent;
        }
        .input_notch span {
          padding: 0 4px;
          color: transparent;
          font: var(--text-label-alt);
          border-top: var(--focused-border, var(--border));
          transition: all 0.1s ease-out;
        }
        .input_notch:before {
          content: "";
          display: block;
          width: 16px;
          border-top-left-radius: 4px;
          border-top: var(--border);
        }
        .input_notch:after {
          content: "";
          display: block;
          flex: 1;
          border-top-right-radius: 4px;
          border-top: var(--border);
        }

        .input_number::-webkit-outer-spin-button,
        .input_number::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  )
}
