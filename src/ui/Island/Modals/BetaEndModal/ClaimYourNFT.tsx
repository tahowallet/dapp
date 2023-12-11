import React from "react"
import Button from "shared/components/Interface/Button"

export default function ClaimYourNFT() {
  return (
    <>
      <div
        className="modal_actions_column column"
        style={{ alignItems: "end", textAlign: "right" }}
      >
        <h2 className="modal_actions_header">Claim your NFT</h2>
        <p className="modal_actions_description">
          Each participants receives an NFT
          <br /> as proof of participations.
        </p>
        <Button
          onClick={(e) => {
            e.preventDefault()
            window.open("/", "_blank")
          }}
        >
          Claim NFT on Galxe
        </Button>
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
