import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    <>
      <div className="modalOverlay">
        <div className="modalContainer">{children}</div>
      </div>
      <style jsx>{`
        .modalOverlay {
            position: absolute;
            top: 0
            left: 0;
            bottom: 0;
            right: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modalContainer {
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            backdrop-filter: blur(26px);
            background: #06302e80;
        }
    `}</style>
    </>
  );
}
