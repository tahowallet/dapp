import React, { FormEvent, useState } from "react"
import Button from "shared/components/Interface/Button"

export default function GetUpdatesForm() {
  const [emailAddress, setEmailAddress] = useState("")

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault()

    // TODO: logic for sending form
  }

  return (
    <>
      <form className="row_center" onSubmit={formSubmitHandler}>
        <input
          tabIndex={0}
          placeholder="Email address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          className="modal_actions_input"
        />
        <Button buttonType="submit" style={{ transform: "translateX(-20px)" }}>
          Sign up
        </Button>
      </form>
      <style jsx>{`
        .modal_actions_input {
          font-size: 16px;
          line-height: 24px;
          background: var(--primary-p1-100);
          padding: 12px 16px;
          outline: none;
          border-radius: 4px;
          border: 1.5px solid var(--green-60);
          font-family: var(--sans);
          color: var(--secondary-s1-100);
        }
        modal_actions_input:focus,
        modal_actions_input:active {
          border-color: var(--secondary-s1-100);
        }
      `}</style>
    </>
  )
}
