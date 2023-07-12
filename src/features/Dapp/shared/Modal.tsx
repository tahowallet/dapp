import { css } from "linaria";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

const modalOverlay = css`
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
`;

const modalContainer = css`
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(26px);
  background: #06302e80;
  // radial-gradient(
  //   57.41% 54.95% at 64.58% 47.64%,
  //   rgba(27, 97, 94, 0) 0%,
  //   rgba(27, 97, 94, 0.2) 100%
  // ),
  // linear-gradient(
  //   137deg,
  //   rgba(26, 94, 91, 0.9) 0%,
  //   rgba(26, 106, 103, 0) 100%
  // ),
  // rgba(6, 48, 46, 0.5);
`;

export default function Modal({ children }: ModalProps) {
  return (
    <div className={modalOverlay}>
      <div className={modalContainer}>{children}</div>
    </div>
  );
}
