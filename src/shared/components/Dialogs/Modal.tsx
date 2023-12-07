import classNames from "classnames"
import React, { CSSProperties } from "react"
import { easings, useSpring, animated } from "@react-spring/web"

import Portal from "../Interface/Portal"
import { noop } from "../../utils"
import ClickableModalOverlay from "./ClickableModalOverlay"

function CloseBtn({ onClick, style }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.4143 20.0001L26.2072 15.2072L24.793 13.793L20.0001 18.5859L15.2072 13.793L13.793 15.2072L18.5859 20.0001L13.793 24.793L15.2072 26.2072L20.0001 21.4143L24.793 26.2072L26.2072 24.793L21.4143 20.0001Z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="20" fill="#E4EEEE" fillOpacity="0.2" />
      <style jsx>
        {`
          svg {
            position: absolute;
            top: 40px;
            right: 40px;
            color: #588382;
            --fill-opacity: 0.5;
            --stroke-opacity: 0.3;
            z-index: 100;
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

type ModalProps = {
  children: React.ReactNode
  /**
   * - island-with-overlay: modal has a light overlay covering the island, navigation is accessible
   * - island-without-overlay: modal has no overlay but island is not accessible, navigation is accessible
   * - fullscreen: modal has a dark overlay that covers the whole screen, navigation is not accessible
   * - freeform: no styling applied
   * @default "freeform"
   */
  type?:
    | "fullscreen"
    | "freeform"
    | "island-with-overlay"
    | "island-without-overlay"
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
  const isOverlay = type === "island-with-overlay" || type === "fullscreen"

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
            overlay: isOverlay,
          })}
        />
        {isOverlay && <CloseBtn onClick={onClickOutside} />}
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
              overflow: hidden;
              z-index: var(--z-modal-island);
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
  topSpacing?: string
  bottomSpacing?: string
} & ModalProps

/**
 * Modal container, allows for scrolling when modal does not fit the window
 */
function ScrollableContainer({
  topSpacing = "104px",
  bottomSpacing = "160px",
  children,
  type = "freeform",
  onClickOutside = noop,
}: ScrollableContainerProps) {
  const [props] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1, position: "relative" },
      config: { duration: 300, easing: easings.easeInOutCubic },
    }),
    []
  )

  return (
    <>
      <Container type={type} onClickOutside={onClickOutside}>
        <animated.div style={props}>
          <div className="no_scrollbar scrollable_modal">
            <ClickableModalOverlay close={onClickOutside} />
            {children}
          </div>
        </animated.div>
      </Container>
      <style jsx>
        {`
          .scrollable_modal {
            height: 100vh;
            padding-top: ${topSpacing};
            padding-bottom: ${bottomSpacing};
            overflow: visible auto;
            display: flex;
            justify-content: center;
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
          align-self: flex-start;
        }

        .modal_shadow {
          width: 98%;
          height: 30px;
          background: #0d2120;
          filter: blur(22px);
          pointer-events: none;
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
function AnimatedContent({
  children,
  style,
}: {
  children: React.ReactNode
  style?: CSSProperties
}) {
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
      <Content style={{ ...style, height: "100vh", justifyContent: "center" }}>
        {children}
      </Content>
    </animated.div>
  )
}

const Modal = { Container, ScrollableContainer, Content, AnimatedContent }

export default Modal
