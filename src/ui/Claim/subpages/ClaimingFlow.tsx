import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Modal from "shared/components/Dialogs/Modal"
import { ROUTES } from "shared/constants"
import ClaimingPledge from "./ClaimingPledge"
import ClaimingSignTx from "./ClaimingSignTx"

export default function ClaimingFlow() {
  return (
    <Modal.AnimatedContent>
      <div className="flow column">
        <Switch>
          <Route path={ROUTES.CLAIM.DETAILS_PLEDGE}>
            {/* <ClaimingSteps currentStep="Community Pledge" /> */}
            <ClaimingPledge />
          </Route>
          <Route path={ROUTES.CLAIM.DETAILS_SIGN}>
            {/* <ClaimingSteps currentStep="Claim" /> */}
            <ClaimingSignTx />
          </Route>
          <Route exact path={ROUTES.CLAIM.DETAILS}>
            <Redirect to={ROUTES.CLAIM.DETAILS_PLEDGE} />
          </Route>
        </Switch>
      </div>
      <style jsx>{`
        .flow {
          box-sizing: border-box;
          padding: 48px;
          gap: 40px;
          width: 816px;
        }
      `}</style>
      <style jsx global>{`
        .flow {
          color: var(--secondary-s1-60);
        }
        .flow h1 {
          color: var(--secondary-s1-100);
        }
        .flow h3 {
          color: var(--secondary-s1-80);
          font-size: 22px;
          font-style: normal;
          font-weight: 600;
          line-height: 32px;
        }
      `}</style>
    </Modal.AnimatedContent>
  )
}
