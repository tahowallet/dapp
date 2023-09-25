import React from "react"
import { Group, Image } from "react-konva"
import useImage from "use-image"
import pin from "shared/assets/realm-pin.svg"
import {
  selectStakingRealmId,
  selectWalletAvatar,
  useDappSelector,
} from "redux-state"
import { realms } from "shared/constants"

const PIN_TRANSLATE = 200

export default function RealmPin() {
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const avatar = useDappSelector(selectWalletAvatar)

  const [pinImage] = useImage(pin)
  const [avatarImage] = useImage(avatar)

  const stakingRealm = realms.find((realm) => realm.id === stakingRealmId)

  if (!stakingRealmId || !stakingRealm) return null

  const pinX = stakingRealm.x + stakingRealm.w * 0.75 - PIN_TRANSLATE
  const pinY = stakingRealm.y + stakingRealm.h / 2 - PIN_TRANSLATE

  return (
    <Group listening={false}>
      <Image image={pinImage} x={pinX} y={pinY} height={237} width={290} />
      <Image
        image={avatarImage}
        x={pinX + 21}
        y={pinY + 18}
        height={158}
        width={158}
        cornerRadius={79}
      />
    </Group>
  )
}
