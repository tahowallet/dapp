import React from "react"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import Modal from "../../shared/Modal"
import ClaimingSignPledge from "./ClaimingSignPledge"
import ClaimingDelegate from "./ClaimingDelegate"
import ClaimingSignTx from "./ClaimingSignTx"
import ClaimingSteps from "./ClaimingSteps"

export default function ClaimingFlow() {
  const { path } = useRouteMatch()

  return (
    <Modal type="freeform">
      <div className="flow column">
        <Switch>
          <Route path={`${path}/pledge`}>
            <ClaimingSteps currentStep="Community Pledge" />
            <ClaimingSignPledge />
          </Route>
          <Route path={`${path}/delegate`}>
            <ClaimingSteps currentStep="Delegate" />
            <ClaimingDelegate />
          </Route>
          <Route path={`${path}/sign`}>
            <ClaimingSteps currentStep="Claim" />
            <ClaimingSignTx />
          </Route>
          <Route exact path={path}>
            <Redirect to={`${path}/pledge`} />
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
    </Modal>
  )
}
