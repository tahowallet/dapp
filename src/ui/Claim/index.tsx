import React from "react"
import { Route, Switch } from "react-router-dom"
import { ROUTES } from "shared/constants"
import ClaimCheck from "./ClaimCheck"
import Claiming from "./subpages"
import ClaimFinish from "./ClaimFinish"
import ClaimAlreadyClaimed from "./ClaimAlreadyClaimed"
import ClaimCheckResult from "./ClaimCheckResult"

export default function Claim() {
  return (
    <Switch>
      <Route path={ROUTES.CLAIM.RESULT}>
        <ClaimCheckResult />
      </Route>
      <Route path={ROUTES.CLAIM.DETAILS}>
        <Claiming />
      </Route>
      <Route path={ROUTES.CLAIM.FINISH}>
        <ClaimFinish />
      </Route>
      <Route path={ROUTES.CLAIM.ALREADY_CLAIMED}>
        <ClaimAlreadyClaimed />
      </Route>
      <Route exact path={ROUTES.CLAIM.HOME}>
        <ClaimCheck />
      </Route>
    </Switch>
  )
}
