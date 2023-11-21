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
import { getPinShift } from "shared/utils"

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
