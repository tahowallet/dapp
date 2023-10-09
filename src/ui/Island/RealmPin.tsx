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

const PIN_TRANSLATE = 350

export default function RealmPin() {
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const avatar = useDappSelector(selectWalletAvatar)

  const [pinImage] = useImage(pin)
  const [avatarImage] = useImage(avatar)

  const stakingRealm = stakingRealmId && getRealmMapData(stakingRealmId)

  if (!stakingRealmId || !stakingRealm) return null

  const pinX = stakingRealm.x + stakingRealm.w * 0.75 - PIN_TRANSLATE
  const pinY = stakingRealm.y + stakingRealm.h / 2 - PIN_TRANSLATE

  return (
    <Group listening={false}>
      <Image
        image={pinImage}
        x={pinX}
        y={pinY}
        height={86 * FIGMA_FACTOR.Y}
        width={74 * FIGMA_FACTOR.X}
      />
      <Image
        image={avatarImage}
        x={pinX + 24}
        y={pinY + 20}
        height={60 * FIGMA_FACTOR.Y}
        width={60 * FIGMA_FACTOR.X}
        cornerRadius={100}
      />
    </Group>
  )
}
