import React from "react"
import GetUpdatesForm from "./GetUpdatesForm"

export default function GetUpdates() {
  return (
    <>
      <div className="modal_actions_column">
        <h2 className="modal_actions_header">Get Updates</h2>
        <p className="modal_actions_description">
          Sign up for updates below to learn
          <br />
          when Season 1 is starting.
        </p>{" "}
        <GetUpdatesForm />
      </div>
      <style jsx>{`
        .modal_actions_column {
          width: 50%;
          padding-inline: 47px;
        }
        .modal_actions_header {
          font-size: 28px;
          font-weight: 500;
          line-height: 32px;
          margin-bottom: 10px;
        }
        .modal_actions_description {
          margin-bottom: 18px;
        }
      `}</style>
    </>
  )
}
