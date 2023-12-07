import React from "react"
import { Group, Image } from "react-konva"
import useImage from "use-image"
import pin from "shared/assets/realm-pin.svg"
import {
  selectDisplayedRealmId,
  selectRealmPanelVisible,
  selectStakingRealmId,
  selectWalletAvatar,
  selectWalletAvatarType,
  useDappSelector,
} from "redux-state"
import { FIGMA_FACTOR, getRealmMapData } from "shared/constants"
import { getPinShift } from "shared/utils"
import KonvaVideo from "shared/components/Media/KonvaVideo"

type RealmPinAvatarProps = {
  x: number
  y: number
}

function RealmPinAvatar({ x, y }: RealmPinAvatarProps) {
  const avatar = useDappSelector(selectWalletAvatar)
  const avatarType = useDappSelector(selectWalletAvatarType)

  const [avatarImage] = useImage(avatar)

  if (avatarType === "video/mp4") {
    return (
      <KonvaVideo
        src={avatar}
        x={x + 32}
        y={y + 28}
        height={58 * FIGMA_FACTOR.Y}
        width={58 * FIGMA_FACTOR.X}
        videoProps={{ cornerRadius: 100 }}
      />
    )
  }

  return (
    <Image
      image={avatarImage}
      x={x + 32}
      y={y + 28}
      height={58 * FIGMA_FACTOR.Y}
      width={58 * FIGMA_FACTOR.X}
      cornerRadius={100}
    />
  )
}

export default function RealmPin() {
  const selectedRealmPanelVisible = useDappSelector(selectRealmPanelVisible)
  const selectedRealmId = useDappSelector(selectDisplayedRealmId)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const [pinImage] = useImage(pin)

  const stakingRealm = stakingRealmId && getRealmMapData(stakingRealmId)

  if (!stakingRealmId || !stakingRealm) return null
  if (
    selectedRealmPanelVisible &&
    selectedRealmId &&
    stakingRealmId !== selectedRealmId
  )
    return null
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
      <RealmPinAvatar x={pinX} y={pinY} />
    </Group>
  )
}
