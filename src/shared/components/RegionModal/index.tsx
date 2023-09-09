import React, { useMemo, useState } from "react"
import {
  useSpring,
  animated,
  easings,
  useTransition as useSpringTransition,
} from "@react-spring/web"
import Modal from "shared/components/Modal"
import { regions } from "shared/constants"
import RegionModalContent from "./RegionModalContent"

function PrevBtn({ onClick, style }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <rect
        x={80}
        y={80}
        width={80}
        height={80}
        rx={40}
        transform="rotate(-180 80 80)"
        fill="#E4EEEE"
        fillOpacity={0.1}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.067 29.933l-8.014 8.015a2.667 2.667 0 000 3.77l8.062 8.063.01.01 1.415-1.414-.011-.01L32.162 41h18.505v-2H31.829l7.652-7.653-1.414-1.414z"
        fill="currentColor"
        fillOpacity="var(--fill-opacity)"
      />
      <rect
        className="circle_stroke"
        x={79.5}
        y={79.5}
        width={79}
        height={79}
        rx={39.5}
        transform="rotate(-180 79.5 79.5)"
        stroke="currentColor"
        strokeOpacity="var(--stroke-opacity)"
      />
      <style jsx>
        {`
          svg {
            color: #e4eeee;
            --fill-opacity: 0.5;
            --stroke-opacity: 0.3;
          }
          svg * {
            transition: all 0.3s ease-out;
          }

          svg:hover {
            cursor: pointer;
            color: var(--semantic-success);
            --fill-opacity: 1;
            --stroke-opacity: 1;
          }
        `}
      </style>
    </svg>
  )
}

function NextBtn({ onClick, style }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <rect width={80} height={80} rx={40} fill="#E4EEEE" fillOpacity={0.1} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.933 50.067l8.014-8.015a2.667 2.667 0 000-3.77l-8.062-8.063-.01-.01-1.415 1.414.011.01L47.838 39H29.333v2h18.838l-7.652 7.653 1.414 1.414z"
        fill="currentColor"
        fillOpacity="var(--fill-opacity)"
      />
      <rect
        x={0.5}
        y={0.5}
        width={79}
        height={79}
        rx={39.5}
        stroke="currentColor"
        strokeOpacity="var(--stroke-opacity)"
      />
      <style jsx>
        {`
          svg {
            color: #e4eeee;
            --fill-opacity: 0.5;
            --stroke-opacity: 0.3;
          }
          svg * {
            transition: all 0.3s ease-out;
          }

          svg:hover {
            cursor: pointer;
            color: var(--semantic-success);
            --fill-opacity: 1;
            --stroke-opacity: 1;
          }
        `}
      </style>
    </svg>
  )
}

export default function RegionModal({
  regionId: initialRegionId,
  onClose,
  children,
}: {
  regionId: string
  onClose: () => void
  children: React.ReactNode
}) {
  const [regionId, setRegionId] = useState(initialRegionId)
  const [prevRegion, nextRegion] = useMemo(() => {
    const index = regions.findIndex((region) => region.id === regionId)

    const prev =
      index - 1 < 0 ? regions[regions.length - 1].id : regions[index - 1].id
    const next =
      index + 1 === regions.length ? regions[0].id : regions[index + 1].id
    return [prev, next]
  }, [regionId])

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

  const transitions = useSpringTransition(regionId, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
    config: { duration: 200, easing: easings.easeOutQuad },
  })

  return (
    <Modal.Container type="fullscreen" onClickOutside={onClose}>
      <animated.div style={{ position: "relative" }}>
        <PrevBtn
          style={{
            position: "absolute",
            top: "68px",
            left: -80,
            zIndex: 1,
            transform: "translateX(-100%)",
          }}
          onClick={() => setRegionId(prevRegion)}
        />
        <NextBtn
          style={{
            position: "absolute",
            top: "68px",
            right: -80,
            zIndex: 1,
            transform: "translateX(100%)",
          }}
          onClick={() => setRegionId(nextRegion)}
        />
        <animated.div style={props}>
          {transitions((style, item) => (
            <animated.div style={{ ...style }}>
              <RegionModalContent regionId={item}>
                {children}
              </RegionModalContent>
            </animated.div>
          ))}
        </animated.div>
      </animated.div>
    </Modal.Container>
  )
}
