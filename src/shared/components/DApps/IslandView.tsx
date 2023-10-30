import React, { lazy } from "react"
import TestingPanel from "testing/components/TestingPanel"
import Nav from "ui/Nav"
import { Route, Switch } from "react-router-dom"
import { ROUTES } from "shared/constants"
import Footer from "ui/Footer"
import IslandComponent from "ui/Island"
import {
  selectHasLoadedBalances,
  selectHasLoadedRealmData,
  selectHasLoadedSeasonInfo,
  selectIslandMode,
  useDappSelector,
} from "redux-state"
import TrackEvent from "./TrackEvent"
import FullPageLoader from "../FullPageLoader"

const Claim = lazy(() => import("ui/Claim"))
const Referrals = lazy(() => import("ui/Referrals"))
const LiquidityPool = lazy(() => import("ui/LiquidityPool"))

export default function IslandView() {
  const islandMode = useDappSelector(selectIslandMode)
  const hasLoadedRealmData = useDappSelector(selectHasLoadedRealmData)
  const hasLoadedSeasonInfo = useDappSelector(selectHasLoadedSeasonInfo)
  const hasBalances = useDappSelector(selectHasLoadedBalances)

  return (
    <TrackEvent>
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
    </TrackEvent>
  )
}
