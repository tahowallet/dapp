import classNames from "classnames"
import React from "react"
import { easings, useSpring, animated } from "@react-spring/web"

import Portal from "./Portal"
import { noop } from "../utils"

type ModalProps = {
  children: React.ReactNode
  /**
   * - map-with-overlay: modal has a light overlay covering the map, navigation is accessible
   * - map-without-overlay: modal has no overlay but map is not accessible, navigation is accessible
   * - fullscreen: modal has a dark overlay that covers the whole screen, navigation is not accessible
   * - freeform: no styling applied
   * @default "freeform"
   */
  type?: "fullscreen" | "freeform" | "map-with-overlay" | "map-without-overlay"
  onClickOutside?: () => void
}

/**
 * Modal container, renders at root level
 */
function Container({
  children,
  type = "freeform",
  onClickOutside = noop,
}: ModalProps) {
  return (
    <Portal>
      <div
        className={classNames({
          modal_overlay: type !== "freeform",
          [type]: true,
        })}
      >
        <div
          role="button"
          tabIndex={-1}
          onKeyUp={(e) => {
            if (e.target === e.currentTarget && e.key === "Escape") {
              onClickOutside()
            }
          }}
          aria-label="Close modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClickOutside()
            }
          }}
          className={classNames("modal_background", {
            overlay: type === "map-with-overlay" || type === "fullscreen",
          })}
        />
        {children}
        <style jsx>
          {`
            .modal_overlay {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              z-index: var(--z-modal-map);
            }

            .modal_background {
              position: absolute;
              inset: 0;
              // negative z-index here positions relative to the parent's z-index
              z-index: -1;
              animation: fade_in 0.2s ease-in-out;
            }

            .overlay {
              --target-opacity: 0.8;
              background: var(--primary-p1-100);
              opacity: var(--target-opacity);
            }

            .fullscreen {
              z-index: var(--z-modal-overlay);
            }

            @keyframes fade_in {
              from {
                opacity: 0;
              }
              to {
                opacity: var(--target-opacity);
              }
            }
          `}
        </style>
      </div>
    </Portal>
  )
}

type ScrollableContainerProps = {
  /**
   * position of the modal from top of the screen
   */
  topSpacing: number
} & ModalProps

/**
 * Modal container, allows for scrolling when modal does not fit the window
 */
function ScrollableContainer({
  topSpacing,
  children,
  type = "freeform",
  onClickOutside = noop,
}: ScrollableContainerProps) {
  return (
    <>
      <Container type={type} onClickOutside={onClickOutside}>
        <div className="no_scrollbar scrollable_modal">{children}</div>
      </Container>
      <style jsx>
        {`
          .scrollable_modal {
            height: 100vh;
            padding-top: ${topSpacing}px;
            padding-bottom: 160px;
            overflow: hidden auto;
          }
        `}
      </style>
    </>
  )
}

/**
 * Modal content wrapper, contains backdrop and shadow styles
 */
function Content({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div className="modal_container" style={style}>
      {children}
      <div className="modal_shadow" />
      <style jsx>{`
        .modal_container {
          position: relative;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(26px);
          color: #e4eeee;
          background: radial-gradient(
              57.41% 54.95% at 64.58% 47.64%,
              rgba(27, 97, 94, 0) 0%,
              rgba(27, 97, 94, 0.2) 100%
            ),
            linear-gradient(
              137deg,
              rgba(26, 94, 91, 0.9) 0%,
              rgba(26, 106, 103, 0) 100%
            ),
            rgba(6, 48, 46, 0.5);
        }

        .modal_shadow {
          width: 98%;
          height: 30px;
          background: #0d2120;
          filter: blur(22px);
          position: absolute;
          bottom: -20px;
          left: 1%;
          z-index: -1;
        }
      `}</style>
    </div>
  )
}

/**
 * Modal content wrapper, it uses Content component adding animation to it
 */
function AnimatedContent({ children }: { children: React.ReactNode }) {
  const [props] = useSpring(
    () => ({
      from: {
        transform: "translate3d(0,38.5%,0) scale(0)",
      },
      to: {
        transform: "translate3d(0,0,0) scale(1)",
        position: "relative",
      },
      config: { duration: 400, easing: easings.easeInOutCubic },
    }),
    []
  )

  return (
    <animated.div style={{ ...props, transformOrigin: "bottom" }}>
      <Content>{children}</Content>
    </animated.div>
  )
}

const Modal = { Container, ScrollableContainer, Content, AnimatedContent }

export default Modal
