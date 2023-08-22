import React from "react"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import Modal from "../../shared/components/Modal"
import ClaimingSignPledge from "./ClaimingSignPledge"
import ClaimingSignTx from "./ClaimingSignTx"
import ClaimingSteps from "./ClaimingSteps"

export default function ClaimingFlow() {
  const { path } = useRouteMatch()

  return (
    <Modal.Content>
      <div className="flow column">
        <Switch>
          <Route path={`${path}/pledge`}>
            <ClaimingSteps currentStep="Community Pledge" />
            <ClaimingSignPledge />
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
    </Modal.Content>
  )
}
