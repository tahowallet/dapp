import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import ClaimCheck from "./ClaimCheck"
import Claiming from "./subpages"
import ClaimFinish from "./ClaimFinish"
import ClaimAlreadyClaimed from "./ClaimAlreadyClaimed"
import ClaimCheckResult from "./ClaimCheckResult"

export default function Claim() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/result`}>
        <ClaimCheckResult />
      </Route>
      <Route path={`${path}/claiming`}>
        <Claiming />
      </Route>
      <Route path={`${path}/finish`}>
        <ClaimFinish />
      </Route>
      <Route path={`${path}/claimed`}>
        <ClaimAlreadyClaimed />
      </Route>
      <Route exact path={path}>
        <ClaimCheck />
      </Route>
    </Switch>
  )
}
