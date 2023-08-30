import classNames from "classnames"
import React from "react"

import Portal from "./Portal"
import { filterUndefinedProps, noop } from "../utils"

export type ModalProps = {
  children: React.ReactNode
  /**
   * - map-with-overlay: modal has a light overlay covering the map, navigation is accessible
   * - map-without-overlay: modal has no overlay but map is not accessible, navigation is accessible
   * - fullscreen: modal has a dark overlay that covers the whole screen, navigation is not accessible
   * - freeform: no styling applied
   * @default "freeform"
   */
  type?: "fullscreen" | "freeform" | "map-with-overlay" | "map-without-overlay"
  /**
   * @default "none"
   */
  overlay?: "light" | "dark" | "none"
  /**
   * @default "map"
   */
  positioning?: "map" | "fullscreen"
  onClickOutside?: () => void
}

const getVariantProps = (variant?: string) => {
  switch (variant) {
    case "fullscreen":
      return { overlay: "dark", positioning: "fullscreen" }
    case "map-with-overlay":
      return { overlay: "light", positioning: "map" }
    case "map-without-overlay":
      return { overlay: "none", positioning: "map" }
    default:
      return {}
  }
}

/**
 * Modal container, renders at root level
 */
function Container({
  children,
  type = "freeform",
  onClickOutside = noop,
  ...rest
}: ModalProps) {
  const { overlay = "none", positioning = "map" } = {
    ...getVariantProps(type),
    // overrides
    ...filterUndefinedProps({
      overlay: rest.overlay,
      positioning: rest.positioning,
    }),
  }
  return (
    <Portal>
      <div
        className={classNames("modal_container", {
          modal_layout: type !== "freeform",
          [positioning]: true,
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
            overlay_light: overlay === "light",
            overlay_dark: overlay === "dark",
          })}
        />
        {children}
        <style jsx>
          {`
            .modal_container {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              width: 100vw;
              height: 100vh;
            }

            .modal_layout {
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            .modal_background {
              position: absolute;
              inset: 0;
              // negative z-index here positions relative to the parent's z-index
              z-index: -1;
              animation: fade_in 0.2s ease-in-out;
            }

            .overlay_dark {
              --target-opacity: 0.8;
              background: var(--primary-p1-100);
              opacity: var(--target-opacity);
            }

            .overlay_light {
              --target-opacity: 0.7;
              opacity: var(--target-opacity);
              background: var(--primary-p1-100);
            }

            // positioning
            .map {
              z-index: var(--z-modal-map);
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
          max-height: 90vh;
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

const Modal = { Container, Content }

export default Modal
