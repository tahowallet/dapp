import React from "react"
import {
  useSpring,
  animated,
  easings,
  useTransition as useSpringTransition,
} from "@react-spring/web"
import Modal from "shared/components/Modal"
// import { REALMS_MAP_DATA } from "shared/constants"
// import { useIslandContext } from "shared/hooks"
import { selectDisplayedRealmId, useDappSelector } from "redux-state"
import RealmModalContent from "./RealmModalContent"

export default function RealmModal({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) {
  const initialRealmId = useDappSelector(selectDisplayedRealmId)

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

  const [props] = useSpring(
    () => ({
      from: {
        transform: "translate3d(0,38.5%,0) scale(0.8)",
        opacity: 0,
      },
      to: {
        transform: "translate3d(0,0,0) scale(1)",
        opacity: 1,
        position: "relative",
      },
      config: { duration: 300, easing: easings.easeInOutCubic },
    }),
    []
  )

  const transitions = useSpringTransition(initialRealmId, {
    initial: { backdropFilter: "blur(26px)" },
    from: { opacity: 0, backdropFilter: "blur(0)" },
    enter: { opacity: 1, backdropFilter: "blur(26px)" },
    leave: { opacity: 0, backdropFilter: "blur(0)" },
    exitBeforeEnter: true,
    config: { duration: 200, easing: easings.easeOutQuad },
  })

  return (
    <Modal.Container type="fullscreen" onClickOutside={onClose}>
      <animated.div style={{ position: "relative" }}>
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
        <animated.div style={props}>
          <div
            className="no_scrollbar"
            style={{
              height: "100vh",
              overflow: "hidden auto",
              paddingTop: 104,
              paddingBottom: 90,
            }}
          >
            {transitions((style) => (
              <RealmModalContent onClose={onClose}>
                {children}
              </RealmModalContent>
            ))}
          </div>
        </animated.div>
      </animated.div>
    </Modal.Container>
  )
}
