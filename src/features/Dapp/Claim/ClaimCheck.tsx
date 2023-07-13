import { css } from "linaria";
import React from "react";
import Button from "../shared/Button";

const claimCheckContainer = css`
  padding: 40px 106px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const claimHeaderContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const icon = require("shared/images/social-icons/discord.svg");

export default function ClaimCheck() {
  return (
    <div className={claimCheckContainer}>
      <div className={claimHeaderContainer}>
        <div>Season 1</div>
        <h1>Check if you are eligible</h1>
        <div>Check if you are eligible to claim TAHO tokens</div>
      </div>
      <div>
        <input placeholder="Address / Ens / Uns..." />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          Primary
          <Button iconSrc={icon} type="primary">
            Button
          </Button>
          <Button iconSrc={icon} type="primary" isDisabled>
            Button
          </Button>
          <Button iconSrc={icon} type="primary" size="large">
            Button
          </Button>
          <Button iconSrc={icon} type="primary" size="large" isDisabled>
            Button
          </Button>
          Secondary
          <Button iconSrc={icon} type="secondary">
            Button
          </Button>
          <Button iconSrc={icon} type="secondary" isDisabled>
            Button
          </Button>
          <Button iconSrc={icon} type="secondary" size="large">
            Button
          </Button>
          <Button iconSrc={icon} type="secondary" size="large" isDisabled>
            Button
          </Button>
          Tertiary
          <Button iconSrc={icon} type="tertiary">
            Button
          </Button>
          <Button iconSrc={icon} type="tertiary" isDisabled>
            Button
          </Button>
          <Button iconSrc={icon} type="tertiary" size="large">
            Button
          </Button>
          <Button iconSrc={icon} type="tertiary" size="large" isDisabled>
            Button
          </Button>
        </div>
      </div>
    </div>
  );
}
