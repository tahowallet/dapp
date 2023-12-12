import React, { FormEvent, useEffect, useState } from "react"
import Button from "shared/components/Interface/Button"
import { EMAIL_REGEX } from "shared/constants"
import iconSuccess from "shared/assets/icons/m/notif-correct.svg"
import iconFail from "shared/assets/icons/m/notif-wrong.svg"
import Icon from "shared/components/Media/Icon"

enum SignUpMessage {
  SUCCESS = "Sign up successful",
  INVALID_MAIL = "Invalid email address",
  FAIL = "Something went wrong",
}

export default function GetUpdatesForm() {
  const [emailAddress, setEmailAddress] = useState("")
  const [signUpMessage, setSignUpMessage] = useState<string | null>(null)

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault()

    const trimmedEmailAddress = emailAddress.trim()
    const isEmail = EMAIL_REGEX.test(trimmedEmailAddress)

    if (trimmedEmailAddress === "" || !isEmail) {
      setSignUpMessage(SignUpMessage.INVALID_MAIL)
      return
    }

    // TODO: logic for sending form
    setEmailAddress("")
    setSignUpMessage(SignUpMessage.SUCCESS)
  }

  // Clear sign up message after 3 seconds
  useEffect(() => {
    if (signUpMessage) {
      const timeout = setTimeout(() => setSignUpMessage(null), 3000)
      return () => clearTimeout(timeout)
    }

    return () => {}
  }, [signUpMessage])

  return (
    <>
      <form className="row_center" onSubmit={formSubmitHandler}>
        <div style={{ position: "relative" }}>
          <input
            tabIndex={0}
            placeholder="Email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="modal_actions_input"
          />
          {signUpMessage && (
            <div className="modal_actions_input_message row_center">
              <Icon
                src={
                  signUpMessage === SignUpMessage.SUCCESS
                    ? iconSuccess
                    : iconFail
                }
                color={
                  signUpMessage === SignUpMessage.SUCCESS
                    ? "var(--trading-in)"
                    : "var(--semantic-error)"
                }
              />
              <span>{signUpMessage}</span>
            </div>
          )}
        </div>
        <Button buttonType="submit" style={{ transform: "translateX(-20px)" }}>
          Sign up
        </Button>
      </form>
      <style jsx>{`
        .modal_actions_input {
          font-size: 16px;
          line-height: 24px;
          background: var(--primary-p1-100);
          padding: 12px 32px 12px 16px;
          outline: none;
          border-radius: 4px;
          border: 1.5px solid var(--green-60);
          font-family: var(--sans);
          color: var(--secondary-s1-100);
          width: 207px;
        }
        modal_actions_input:focus,
        modal_actions_input:active {
          border-color: var(--secondary-s1-100);
        }
        .modal_actions_input_message {
          position: absolute;
          left: 0;
          top: 100%;
          padding: 4px 8px;
          gap: 4px;
          color: ${signUpMessage === SignUpMessage.SUCCESS
            ? "var(--trading-in)"
            : "var(--semantic-error)"};
        }
        .modal_actions_input_message > span {
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
