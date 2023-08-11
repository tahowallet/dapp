import React from "react"
import { useHistory } from "react-router-dom"
import Modal from "@components/Modal"
import Button from "@components/Button"
import iconConnected from "@assets/icons/s/connected.svg"

import ClaimHeader from "./shared/ClaimHeader"
import ClaimAmount from "./shared/ClaimAmount"
import ClaimCheckRules from "./shared/ClaimCheckRules"
import { Rule } from "./types"

const listMock: Rule[] = [
  {
    success: true,
    label: "Signed the pledge before 12/03/2023",
    amount: 140000,
  },
  {
    success: true,
    label: "Participated in NFT",
    amount: 33000,
  },
  {
    success: true,
    label: "Used referral link",
    amount: 21000,
  },
  {
    success: false,
    label: "Joined 9 community calls",
  },
  {
    success: false,
    label: "Bridged to Optimism",
  },
]

export default function ClaimCheckSuccess() {
  const location = useHistory()

  return (
    <Modal.Container type="map-only">
      <Modal.Content>
        <div className="success_container">
          <ClaimHeader
            season="Season 1"
            header="Congratulation!"
            subheader={
              <>
                <span style={{ color: "var(--semantic-info)" }}>
                  berrry.eth
                </span>{" "}
                is eligible to claim:
              </>
            }
          />
          <div className="column_center">
            <ClaimAmount amount={327000} hasBackground size="large" />
            <ClaimCheckRules rules={listMock} />
          </div>

          <div className="button_container">
            <Button
              type="primary"
              size="large"
              isDisabled
              iconSrc={iconConnected}
              iconPosition="left"
            >
              Connected
            </Button>
            <Button
              onClick={() => location.replace("/claim/claiming")}
              type="primary"
              size="large"
            >
              Start claiming process
            </Button>
          </div>
        </div>
        <style jsx>
          {`
            .success_container {
              display: flex;
              flex-direction: column;
              padding: 40px 148px;
              gap: 40px;
            }
            .button_container {
              margin: 0 -31px;
              display: flex;
              gap: 24px;
            }
          `}
        </style>
      </Modal.Content>
    </Modal.Container>
  )
}
