import React from "react"
import { useHistory } from "react-router-dom"
import {
  selectRegionById,
  setRegionAddressToClaim,
  useDispatch,
  useSelector,
  setMapMode,
  setMapOverlay,
} from "redux-state"
import { RootState } from "redux-state/reducers"
import Button from "shared/components/Button"
import { ROUTES } from "shared/constants"

export default function JoinRegion({
  onClose,
  regionId,
}: {
  onClose: () => void
  regionId: string
}) {
  const location = useHistory()
  const dispatch = useDispatch()
  const { regionAddress } = useSelector((state: RootState) =>
    selectRegionById(state, regionId)
  )

  return (
    <div>
      <Button
        onClick={() => {
          onClose()
          dispatch(setMapMode("default"))
          dispatch(setMapOverlay("none"))
          dispatch(
            setRegionAddressToClaim({ regionAddress: regionAddress ?? null })
          )
          location.push(ROUTES.CLAIM.DETAILS_SIGN)
        }}
        type="primary"
        size="large"
      >
        Choose this region
      </Button>
    </div>
  )
}
