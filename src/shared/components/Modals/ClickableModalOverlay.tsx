import React from "react"

export default function ClickableModalOverlay({
  close,
}: {
  close: VoidFunction
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Clickable Modal Overlay"
        className="clickable-overlay button_reset"
        onClick={close}
      />
      <style jsx>{`
        .clickable-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          cursor: default;
        }
      `}</style>
    </>
  )
}
