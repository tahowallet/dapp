import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import ClaimCheckSuccess from "./ClaimCheckSuccess"
import ClaimCheck from "./ClaimCheck"
import ClaimCheckFail from "./ClaimCheckFail"
import Claiming from "./Claiming"
import ClaimFinish from "./ClaimFinish"
import { useWallet } from "../shared/hooks"
import { ClaimState, ClaimContext } from "./hooks"

export default function Claim() {
  const { path } = useRouteMatch()
  const wallet = useWallet()
  const [claimingAccount, setClaimingAccount] = useState<ClaimState>({
    userDetails: {
      isConnected: wallet.isConnected,
      name: wallet.name || wallet.truncatedAddress,
      address: wallet.address,
    },
  })

  useEffect(() => {
    setClaimingAccount({
      userDetails: {
        isConnected: wallet.isConnected,
        name: wallet.name || wallet.truncatedAddress,
        address: wallet.address,
      },
    })
  }, [wallet])

  return (
    <ClaimContext.Provider value={claimingAccount}>
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
          <ClaimCheck setClaimingAccount={setClaimingAccount} />
        </Route>
      </Switch>
    </ClaimContext.Provider>
  )
}
