import React, { useState } from "react"
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

  const [betaEndModalVisible, setBetaEndModalVisible] = useState(
    process.env.IS_BETA_CLOSED === "true"
  )

  return (
    <>
      <FullPageLoader
        loaded={hasLoadedRealmData && hasLoadedSeasonInfo && hasBalances}
      />
      {process.env.IS_BETA_CLOSED === "true" && betaEndModalVisible && (
        <BetaEndModal
          header="Beta has ended"
          onClose={() => setBetaEndModalVisible(false)}
        >
          Thanks for participating in our Beta, we hope you had fun and see you
          in Season 1. You can still claim your XP until Jan 28 2024.
        </BetaEndModal>
      )}
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
