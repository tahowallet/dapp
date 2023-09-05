import React from "react"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import Modal from "shared/components/Modal"
import ClaimingPledge from "./ClaimingPledge"
import ClaimingSignTx from "./ClaimingSignTx"
import ClaimingJourney from "./ClaimingJourney"

export default function ClaimingFlow() {
  const { path } = useRouteMatch()

  return (
    <div className="column">
      <ClaimingJourney />
      <Modal.Content>
        <div className="flow column">
          <Switch>
            <Route path={`${path}/pledge`}>
              <ClaimingPledge />
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
    </div>
  )
}
