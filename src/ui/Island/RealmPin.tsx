import React from "react"
import { Group, Image } from "react-konva"
import useImage from "use-image"
import pin from "shared/assets/realm-pin.svg"
import {
  selectStakingRealmId,
  selectWalletAvatar,
  useDappSelector,
} from "redux-state"
import { FIGMA_FACTOR, getRealmMapData } from "shared/constants"

function getPinShift(realmId: string) {
  switch (realmId) {
    case "4":
      return { x: 200, y: 300 }
    case "7":
      return { x: 500, y: 300 }
    case "9":
      return { x: 500, y: 300 }
    case "19":
      return { x: 250, y: 250 }
    case "22":
      return { x: 200, y: 250 }
    default:
      return { x: 250, y: 250 }
  }
}

export default function RealmPin() {
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const avatar = useDappSelector(selectWalletAvatar)

  const [pinImage] = useImage(pin)
  const [avatarImage] = useImage(avatar)

  const stakingRealm = stakingRealmId && getRealmMapData(stakingRealmId)

  if (!stakingRealmId || !stakingRealm) return null

  const pinShift = getPinShift(stakingRealmId)
  const pinX = stakingRealm.x + stakingRealm.w * 0.75 - pinShift.x
  const pinY = stakingRealm.y + stakingRealm.h / 2 - pinShift.y

  return (
    <Group listening={false}>
      <Image
        image={pinImage}
        x={pinX}
        y={pinY}
        height={92 * FIGMA_FACTOR.Y}
        width={108 * FIGMA_FACTOR.X}
      />
      <Image
        image={avatarImage}
        x={pinX + 32}
        y={pinY + 28}
        height={58 * FIGMA_FACTOR.Y}
        width={58 * FIGMA_FACTOR.X}
        cornerRadius={100}
      />
    </Group>
  )
}
