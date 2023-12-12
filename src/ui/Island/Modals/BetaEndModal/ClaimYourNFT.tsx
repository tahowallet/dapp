import React from "react"
import Button from "shared/components/Interface/Button"
import { LINKS } from "shared/constants"

export default function ClaimYourNFT() {
  return (
    <>
      <div
        className="modal_actions_column column"
        style={{ alignItems: "end", textAlign: "right" }}
      >
        <h2 className="modal_actions_header">Claim your NFT</h2>
        <p className="modal_actions_description">
          Participated in the beta? See if you are
          <br />
          eligible to claim the NFT awards.
        </p>
        <Button
          onClick={(e) => {
            e.preventDefault()
            window.open(LINKS.GALXE_NFT, "_blank")
          }}
        >
          Check eligibility on Galxe
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
