import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setMapMode, setMapOverlay } from "redux-state/slices/map"
import Button from "shared/components/Button"

export default function JoinRegion({ onClose }: { onClose: () => void }) {
  const location = useHistory()
  const dispatch = useDispatch()

  return (
    <div>
      <Button
        onClick={() => {
          onClose()
          dispatch(setMapMode("default"))
          dispatch(setMapOverlay("none"))
          location.push("/claim/claiming/sign")
        }}
        type="primary"
        size="large"
      >
        Choose this region
      </Button>
    </div>
  )
}
