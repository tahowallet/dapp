import classNames from "classnames"
import React from "react"

type ModalProps = {
  children: React.ReactNode
  /**
   * Modal covers only the map, overlay covers the whole screen
   */
  type?: "overlay" | "modal"
}

export default function Modal({ children, type = "modal" }: ModalProps) {
  return (
    <div className={classNames("modal_overlay", { [type]: true })}>
      <div className="modal_container">
        {children}
        <div className="modal_shadow" />
      </div>
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
          }

          .modal {
            z-index: var(--z-modal);
          }

          .overlay {
            z-index: var(--z-overlay);
          }

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
        `}
      </style>
    </div>
  )
}
