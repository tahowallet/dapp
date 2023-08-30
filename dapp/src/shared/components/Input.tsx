import classNames from "classnames"
import React, { useState } from "react"

export default function SharedInput({
  onChange,
  validate = (value) => ({ value }),
  label,
  value: propsValue,
  disabled = false,
  rightComponent = null,
  style = {},
}: {
  label: string
  disabled?: boolean
  value: string
  onChange?: (value: string) => void
  validate?: (value: string) => { value: unknown } | { error: string }
  rightComponent?: React.ReactNode
  style?: React.CSSProperties & Record<string, string>
}) {
  const [value, setValue] = useState(propsValue)
  const [error, setError] = useState("")

  if (propsValue !== value) {
    setValue(propsValue)
  }

  return (
    <div
      style={style}
      className={classNames("input_group", { error, disabled })}
    >
      <div className="input_box">
        <input
          type="text"
          value={value}
          placeholder=" "
          disabled={disabled}
          onChange={(e) => {
            const newValue = validate(e.target.value)

            if ("error" in newValue) {
              setError(newValue.error)
            } else {
              setError("")
            }
            onChange?.(e.target.value)
          }}
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
      `}</style>
    </div>
  )
}
