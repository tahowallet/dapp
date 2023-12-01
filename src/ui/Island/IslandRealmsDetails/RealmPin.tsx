import React from "react"
import { Group, Image } from "react-konva"
import useImage from "use-image"
import pin from "shared/assets/realm-pin.svg"
import {
  selectStakingRealmId,
  selectWalletAvatar,
  selectWalletAvatarType,
  useDappSelector,
} from "redux-state"
import { FIGMA_FACTOR, getRealmMapData } from "shared/constants"
import { getPinShift } from "shared/utils"
// import KonvaVideo from "shared/components/KonvaVideo"
import portraitImg from "shared/assets/portrait.png"

type RealmPinAvatarProps = {
  x: number
  y: number
}

function RealmPinAvatar({ x, y }: RealmPinAvatarProps) {
  const avatar = useDappSelector(selectWalletAvatar)
  const avatarType = useDappSelector(selectWalletAvatarType)

  const [avatarImage] = useImage(avatar)
  const [portrait] = useImage(portraitImg)

  // TODO: implement video avatar support
  // if (avatarType === "video/mp4") {
  //   return (
  //     <KonvaVideo
  //       src={avatar}
  //       x={x + 32}
  //       y={y + 28}
  //       height={58 * FIGMA_FACTOR.Y}
  //       width={58 * FIGMA_FACTOR.X}
  //       videoProps={{ cornerRadius: 100 }}
  //     />
  //   )
  // }

  return (
    <Image
      image={avatarType === "video/mp4" ? portrait : avatarImage}
      x={x + 32}
      y={y + 28}
      height={58 * FIGMA_FACTOR.Y}
      width={58 * FIGMA_FACTOR.X}
      cornerRadius={100}
    />
  )
}

export default function RealmPin() {
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const [pinImage] = useImage(pin)

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
      <RealmPinAvatar x={pinX} y={pinY} />
    </Group>
  )
}
