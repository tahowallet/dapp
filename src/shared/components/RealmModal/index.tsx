import React, { useEffect } from "react"
import { useAssistant, useLocalStorageChange } from "shared/hooks"
import { LOCAL_STORAGE_VISITED_REALM } from "shared/constants"
import Modal from "shared/components/Modal"
// import { REALMS_MAP_DATA } from "shared/constants"
// import { useIslandContext } from "shared/hooks"
import RealmModalContent from "./RealmModalContent"

export default function RealmModal({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) {
  // const islandContext = useIslandContext()

  // const [prevRealm, nextRealm] = useMemo(() => {
  //   const index = REALMS_MAP_DATA.findIndex(
  //     (realm) => realm.id === initialRealmId
  //   )

  //   const prev =
  //     index - 1 < 0
  //       ? REALMS_MAP_DATA[REALMS_MAP_DATA.length - 1].id
  //       : REALMS_MAP_DATA[index - 1].id
  //   const next =
  //     index + 1 === REALMS_MAP_DATA.length
  //       ? REALMS_MAP_DATA[0].id
  //       : REALMS_MAP_DATA[index + 1].id
  //   return [prev, next]
  // }, [initialRealmId])

  const { updateAssistant } = useAssistant()
  const { value, updateStorage } = useLocalStorageChange<boolean>(
    LOCAL_STORAGE_VISITED_REALM
  )

  useEffect(() => {
    if (value) return
    updateStorage(true)
    updateAssistant({ visible: true, type: "first-realm" })
  }, [value, updateStorage, updateAssistant])

  return (
    <Modal.ScrollableContainer
      type="fullscreen"
      bottomSpacing="90px"
      onClickOutside={onClose}
    >
      {/* <PrevBtn
          style={{
            position: "absolute",
            top: 187,
            left: -80,
            zIndex: 1,
            transform: "translateX(-100%)",
          }}
          onClick={() => islandContext.current.onRealmClick(prevRealm)}
        />
        <NextBtn
          style={{
            position: "absolute",
            top: 187,
            right: -80,
            zIndex: 1,
            transform: "translateX(100%)",
          }}
          onClick={() => islandContext.current.onRealmClick(nextRealm)}
        /> */}
      <RealmModalContent onClose={onClose}>{children}</RealmModalContent>
    </Modal.ScrollableContainer>
  )
}
