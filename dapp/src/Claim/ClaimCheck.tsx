import React, { useContext, useEffect, useState } from "react"
import classNames from "classnames"
import { Redirect, useHistory } from "react-router-dom"
import { useDebounce } from "../shared/hooks/helpers"
import Button from "../shared/components/Button"
import ClaimHeader from "./shared/ClaimHeader"
import Modal from "../shared/components/Modal"
import Spinner from "../shared/components/Spinner"
import { ClaimContext, ClaimState, DEFAULT_CLAIM_STATE } from "./hooks"
import { resolveNameToAddress } from "../shared/utils"

export default function ClaimCheck({
  setClaimingAccount,
}: {
  setClaimingAccount: React.Dispatch<React.SetStateAction<ClaimState>>
}) {
  const history = useHistory()
  const [input, setInput] = useState("")
  const [debouncedInput, setDebouncedInput] = useDebounce("", 500)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [wasTouched, setWasTouched] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const { userDetails } = useContext(ClaimContext)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setHasError(false)
    setWasTouched(true)
    setInput(value)
    setDebouncedInput(value)
  }

  const onSubmit = () => {
    if (address) {
      setClaimingAccount({
        ...DEFAULT_CLAIM_STATE,
        userDetails: {
          isConnected: false,
          name: input,
          address,
        },
      })
      history.push("/claim/result")
    } else {
      setWasTouched(true)
      setHasError(true)
    }
  }

  useEffect(() => {
    const setResolvedAddresss = async (value: string) => {
      setIsLoading(true)
      if (!value.length) {
        setHasError(true)
        setAddress(null)
      } else {
        const resolved = await resolveNameToAddress(value)
        if (resolved) {
          setHasError(false)
          setAddress(resolved)
        } else {
          setHasError(true)
          setAddress(null)
        }
      }
      setIsLoading(false)
    }

    if (debouncedInput.length) {
      setResolvedAddresss(debouncedInput)
    }
  }, [debouncedInput])

  if (userDetails.isConnected) {
    return <Redirect to="/claim/result" />
  }

  return (
    <Modal.Container type="map-only">
      <Modal.Content>
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
                onClick={onSubmit}
                isDisabled={
                  hasError || isLoading || (!input.length && wasTouched)
                }
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
      </Modal.Content>
    </Modal.Container>
  )
}
