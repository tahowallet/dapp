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
      <div className="flow">
        <Switch>
          <Route path={`${path}/pledge`}>
            <ClaimingSteps />
            <ClaimingSignPledge />
          </Route>
          <Route path={`${path}/delegate`}>
            <ClaimingSteps />
            <ClaimingDelegate />
          </Route>
          <Route path={`${path}/sign`}>
            <ClaimingSteps />
            <ClaimingSignTx />
          </Route>
          <Route exact path={path}>
            <Redirect to={`${path}/pledge`} />
          </Route>
        </Switch>
      </div>
      <style jsx>{`
        .flow {
          padding: 48px;
          width: 720px;
        }
      `}</style>
    </Modal>
  )
}
