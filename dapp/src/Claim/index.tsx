import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import ClaimCheckSuccess from "./ClaimCheckSuccess"
import ClaimCheck from "./ClaimCheck"
import ClaimCheckFail from "./ClaimCheckFail"
import Claiming from "./Claiming"
import ClaimFinish from "./ClaimFinish"

export default function Claim() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/success`}>
        <ClaimCheckSuccess />
      </Route>
      <Route path={`${path}/fail`}>
        <ClaimCheckFail />
      </Route>
      <Route path={`${path}/claiming`}>
        <Claiming />
      </Route>
      <Route path={`${path}/finish`}>
        <ClaimFinish />
      </Route>
      <Route exact path={path}>
        <ClaimCheck />
      </Route>
    </Switch>
  )
}
