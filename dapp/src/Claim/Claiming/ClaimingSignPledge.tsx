import React from "react"
import { useHistory } from "react-router-dom"
import Button from "../../shared/Button"
import Icon from "../../shared/Icon"
import earthIcon from "../../shared/assets/icons/earth.svg"
import communityIcon from "../../shared/assets/icons/community.svg"
import rulerIcon from "../../shared/assets/icons/ruler.svg"
import gaslessIcon from "../../shared/assets/icons/gasless.svg"

export default function ClaimingSignPledge() {
  const location = useHistory()

  return (
    <>
      <div className="pledge_container column">
        <div className="pledge_description column">
          <h1>Sign the Taho Community Pledge</h1>
          <p>
            Below are the values baked into every line of Tally Ho&apos;s
            codebase. Our community pledge is that you can expect every update
            in years and decades to be built around these values:
          </p>
        </div>
        <div className="values_list column">
          <div className="values_item row">
            <Icon src={earthIcon} width="64px" />
            <div>
              <h3>Accessible to everyone</h3>
              <p className="column">
                You should have access to web3 systems—no matter where you live.
              </p>
            </div>
          </div>
          <div className="values_item row">
            <Icon src={rulerIcon} width="64px" />
            <div>
              <h3>100% open source</h3>
              <p className="column">
                All code should be 100% open source—for anyone to copy, fork, or
                remix.
              </p>
            </div>
          </div>
          <div className="values_item row">
            <Icon src={communityIcon} width="64px" />
            <div>
              <h3>Fully owned by the community</h3>
              <p className="column">
                Value must flow to the community, rather than a few insiders.
              </p>
            </div>
          </div>
        </div>
        <div className="signing_container column">
          <div className="button_container row">
            <Button type="primary" size="large" isDisabled>
              1. Sign in with Ethereum
            </Button>
            <Button
              onClick={() => location.replace("/claim/claiming/delegate")}
              type="primary"
              size="large"
            >
              2. Sign Pledge
            </Button>
          </div>
          <div className="buttons_info row">
            <Icon src={gaslessIcon} width="30px" type="image" />
            gasless transactions
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .pledge_container {
            gap: 48px;
          }
          .pledge_description {
            gap: 16px;
          }
          .button_container {
            gap: 48px;
          }
          .signing_container {
            gap: 32px;
          }
          .values_list {
            gap: 29px;
          }
          .values_item {
            gap: 28px;
          }
          .buttons_info {
            gap: 8px;
          }
        `}
      </style>
    </>
  )
}
