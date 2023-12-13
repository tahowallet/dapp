import React, { memo, useState } from "react"
import IslandComponent from "ui/Island"
import TestingPanel from "testing/components/TestingPanel"
import Nav from "ui/Nav"
import { ROUTES } from "shared/constants"
import Claim from "ui/Claim"
import Referrals from "ui/Referrals"
import LiquidityPool from "ui/LiquidityPool"
import Footer from "ui/Footer"
import { selectIslandMode, useDappSelector } from "redux-state"
import FullPageLoader from "shared/components/Loaders/FullPageLoader"
import { Route, Switch } from "react-router-dom"
import {
  reflectSingleton,
  useDisplayedPopulation,
  useInitializeReflect,
  useIslandLoaded,
  useReflect,
} from "shared/hooks"
import BetaEndModal from "ui/Island/Modals/BetaEndModal"
import { ReflectContext } from "shared/context"

function IslandView() {
  const isIslandLoaded = useIslandLoaded()
  useInitializeReflect()
  useReflect()
  const islandMode = useDappSelector(selectIslandMode)

  useDisplayedPopulation()

  const [betaEndModalVisible, setBetaEndModalVisible] = useState(
    process.env.IS_BETA_CLOSED === "true"
  )

  return !isIslandLoaded ? (
    <FullPageLoader loaded={isIslandLoaded} />
  ) : (
    <ReflectContext.Provider value={reflectSingleton}>
      {process.env.IS_BETA_CLOSED === "true" && betaEndModalVisible && (
        <BetaEndModal
          header="Beta has ended"
          onClose={() => setBetaEndModalVisible(false)}
        >
          Thanks for participating in our Beta, we hope you had fun and see you
          in Season 1. You can still claim your XP until Dec 21 2023.
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
    </ReflectContext.Provider>
  )
}
export default memo(IslandView)
