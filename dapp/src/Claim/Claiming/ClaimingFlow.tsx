import React from "react"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import Modal from "../../shared/Modal"
import ClaimingSignPledge from "./ClaimingSignPledge"
import ClaimingDelegate from "./ClaimingDelegate"
import ClaimingSignTx from "./ClaimingSignTx"

export default function ClaimingFlow() {
  const { path } = useRouteMatch()

  return (
    <Modal type="freeform">
      <div className="flow">
        <Switch>
          <Route path={`${path}/pledge`}>
            <ClaimingSignPledge />
          </Route>
          <Route path={`${path}/delegate`}>
            <ClaimingDelegate />
          </Route>
          <Route path={`${path}/sign`}>
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
