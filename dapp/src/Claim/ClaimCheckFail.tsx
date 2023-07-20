import React from "react"
import ClaimHeader from "./ClaimHeader"
import Button from "../shared/Button"
import ClaimCheckRules from "./ClaimCheckRules"
import { Rule } from "./types"

const listMock: Rule[] = [
  {
    success: false,
    label: "Signed the pledge before 12/03/2023",
  },
  {
    success: false,
    label: "Participated in NFT",
  },
  {
    success: false,
    label: "Used referral link",
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
export default function ClaimCheckFail() {
  return (
    <>
      <div className="fail_container column_center">
        <ClaimHeader
          season="Season 1"
          header="Not eligible"
          subheader={
            <>
              <span style={{ color: "var(--semantic-info)" }}>berrry.eth</span>{" "}
              is not eligible to claim:
            </>
          }
        />
        <ClaimCheckRules rules={listMock} />
        <Button type="primary" size="large">
          Try another address
        </Button>
      </div>
      <style jsx>{`
        .fail_container {
          padding: 40px 148px;
          gap: 40px;
        }
      `}</style>
    </>
  )
}
