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
import FullPageLoader from "shared/components/Loaders/FullPageLoader"
import { Route, Switch } from "react-router-dom"
import { useDisplayedPopulation } from "shared/hooks"
import BetaEndModal from "ui/Island/Modals/BetaEndModal"

export default function IslandView() {
  const islandMode = useDappSelector(selectIslandMode)
  const hasLoadedRealmData = useDappSelector(selectHasLoadedRealmData)
  const hasLoadedSeasonInfo = useDappSelector(selectHasLoadedSeasonInfo)
  const hasBalances = useDappSelector(selectHasLoadedBalances)

  useDisplayedPopulation()

  return (
    <>
      <FullPageLoader
        loaded={hasLoadedRealmData && hasLoadedSeasonInfo && hasBalances}
      />
      <BetaEndModal
        header="Beta is over, see you in Season 1"
        description="Thanks for participating in our Beta, we hope you had fun and got ot explore many new realms and opportunities. You can still claim your XP until Dec 18 2023."
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
