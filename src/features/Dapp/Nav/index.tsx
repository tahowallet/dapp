import { css } from "linaria";
import React from "react";

const navContainer = css`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: space-between;
  z-index: 1;
`;

export default function Nav() {
  return (
    <div className={navContainer}>
      <div>
        <nav>
          <button>Map</button>
          <button>Referrals</button>
          <button>Claim</button>
        </nav>
      </div>
      <div>Taho logo</div>
      <div>
        <button>
          <img />
          Connect Taho wallet
        </button>
      </div>
    </div>
  );
}
