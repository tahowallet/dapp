import React, { useCallback } from "react"
import OnboardingModal from "ui/Island/Modals/OnboardingModal"
import { useWalletOnboarding } from "shared/hooks"
import {
  selectWalletAddress,
  setDisplayedRealmId,
  setRealmPanelVisible,
  useDappDispatch,
  useDappSelector,
} from "redux-state"

export default function EnterPortal() {
  const walletAddress = useDappSelector(selectWalletAddress)
  const { updateWalletOnboarding } = useWalletOnboarding()

  const dispatch = useDappDispatch()

  const handlePortalEnter = useCallback(() => {
    updateWalletOnboarding(walletAddress)

    // Close the realm panel by default - without this realm panel will stay visible when user
    // disconnects/switches wallet and enters seeing opened panels with no data
    dispatch(setRealmPanelVisible(false))
    dispatch(setDisplayedRealmId(null))
  }, [dispatch, updateWalletOnboarding, walletAddress])

  return (
    <OnboardingModal buttonLabel="Enter Subscape" onClick={handlePortalEnter}>
      You have been
      <br /> granted passage.
    </OnboardingModal>
  )
}
