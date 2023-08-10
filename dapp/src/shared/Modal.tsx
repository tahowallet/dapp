import classNames from "classnames"
import React from "react"

import Portal from "./Portal"
import { noop } from "./utils"

type ModalProps = {
  children: React.ReactNode
  /**
   * - Map-only: modal has a light overlay covering the map
   * - Fullscreen: modal has a dark overlay that covers the whole screen,
   *   including navigation
   * - Freeform: no styling applied
   * @default "freeform"
   */
  type?: "fullscreen" | "freeform" | "map-only"
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
            overlay_light: type === "map-only",
            overlay_dark: type === "fullscreen",
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
              z-index: var(--z-modal-map);
            }

            .modal_background {
              position: absolute;
              inset: 0;
              // negative z-index here positions relative to the parent's z-index
              z-index: -1;
            }

            .overlay_dark {
              background: var(--primary-p1-100);
              opacity: 0.8;
            }

            .overlay_light {
              opacity: 0.7;
              background: var(--primary-p1-100);
            }

            .fullscreen {
              z-index: var(--z-modal-overlay);
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
