import React from "react"
import IslandComponent from "ui/Island"
import TestingPanel from "testing/components/TestingPanel"
import Nav from "ui/Nav"
import { ROUTES } from "shared/constants"
import Claim from "ui/Claim"
import Referrals from "ui/Referrals"
import LiquidityPool from "ui/LiquidityPool"
import Footer from "ui/Footer"
import {
  selectHasLoadedBalances,
  selectHasLoadedRealmData,
  selectHasLoadedSeasonInfo,
  selectIslandMode,
  useDappSelector,
} from "redux-state"
import FullPageLoader from "shared/components/FullPageLoader"
import { Route, Switch } from "react-router-dom"

export default function IslandView() {
  const islandMode = useDappSelector(selectIslandMode)
  const hasLoadedRealmData = useDappSelector(selectHasLoadedRealmData)
  const hasLoadedSeasonInfo = useDappSelector(selectHasLoadedSeasonInfo)
  const hasBalances = useDappSelector(selectHasLoadedBalances)

  return (
    <>
      <FullPageLoader
        loaded={hasLoadedRealmData && hasLoadedSeasonInfo && hasBalances}
      />
      <IslandComponent />
      <TestingPanel />
      {islandMode === "default" && <Nav />}
      <Switch>
        <Route path={ROUTES.CLAIM.HOME}>
          <Claim />
        </Route>
        <Route path={ROUTES.REFERRALS}>
          <Referrals />
        </Route>
        {/* TODO should be removed or defined later */}
        <Route path={ROUTES.LP}>
          <LiquidityPool />
        </Route>
      </Switch>
      <Footer />
    </>
  )
}
