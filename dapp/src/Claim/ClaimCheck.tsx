import React, { useState } from "react"
import classNames from "classnames"
import Button from "../shared/components/Button"
import ClaimHeader from "./shared/ClaimHeader"
import Modal from "../shared/components/Modal"
import { useNameToAddressResolution } from "../shared/hooks"
import Spinner from "../shared/components/Spinner"

export default function ClaimCheck() {
  const [input, setInput] = useState("")
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [wasTouched, setWasTouched] = useState(false)
  const [, setAddress] = useState<string | null>(null)
  const resolveNameToAddress = useNameToAddressResolution()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false)
    setWasTouched(true)
    setInput(event.target.value)
  }

  const setResolvedAddresss = async () => {
    setHasError(false)
    setIsLoading(true)
    if (!input.length) {
      setAddress(null)
      setHasError(true)
    } else {
      const resolved = await resolveNameToAddress(input)
      if (resolved) {
        setAddress(resolved)
      } else {
        setHasError(true)
      }
    }
    setIsLoading(false)
  }

  return (
    <Modal>
      <div className="check_container">
        <ClaimHeader
          season="Season 1"
          header="Check if you are eligible"
          subheader="Check if you are eligible to claim TAHO tokens"
        />
        <div className="input_wrapper column">
          <div className="input_container">
            <input
              className={classNames("input", { error: hasError })}
              placeholder="Address / Ens / Uns..."
              value={input}
              onChange={onChange}
            />
            <div
              className={classNames("spinner_wrapper", {
                invisible: !isLoading,
              })}
            >
              <Spinner />
            </div>
            <Button
              size="large"
              onClick={setResolvedAddresss}
              isDisabled={hasError || (!input.length && wasTouched)}
            >
              Check eligibility
            </Button>
          </div>
          <div className={classNames("input_error", { hidden: !hasError })}>
            Invalid address
          </div>
        </div>
      </div>
      <style jsx>{`
        .check_container {
          padding: 40px 106px 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          color: var(--secondary-s1-100);
        }
        .input_container {
          width: 696px;
          display: flex;
          padding: 20px 24px 20px 43px;
          border-radius: 80px;
          border: 1px solid var(--secondary-s1-30);
          background: var(--primary-p1-100);
          align-items: center;
        }
        .input {
          flex-grow: 1;
          border: 0;
          font-family: "Segment";
          font-size: 18px;
          font-weight: 500;
          line-height: 24px;
          background: transparent;
          color: var(--secondary-s1-100);
        }
        .input.error {
          color: var(--semantic-error);
        }
        .input::placeholder {
          color: var(--secondary-s1-100);
        }
        .input:focus::placeholder {
          color: var(--secondary-s1-50);
        }
        .input_error {
          color: var(--semantic-error);
          padding: 0 45px;
          position: absolute;
          bottom: -35px;
        }
        .input_wrapper {
          position: relative;
          gap: 20px;
        }
        .spinner_wrapper {
          margin: 0 12px;
        }
      `}</style>
    </Modal>
  )
}
