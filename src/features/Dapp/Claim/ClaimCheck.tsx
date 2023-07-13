import { css } from "linaria";
import React from "react";
import Button from "../shared/Button";
import { bodySmallSegment18, h2Quincy48 } from "shared/styles/fonts";
import {
  bodyGrey100,
  bodyGrey70,
  bodySemanticSuccess,
  inputBackgroundGreen100,
  inputBorderGrey30,
  inputTextGreen5,
} from "shared/styles/colors";

const claimCheckContainer = css`
  padding: 40px 106px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  font: ${bodySmallSegment18};
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  color: ${bodyGrey100};
`;
const claimHeaderContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const claimSeason = css`
  text-transform: uppercase;
  font-weight: 600;
  color: ${bodySemanticSuccess};
`;
const claimHeader = css`
  font: ${h2Quincy48};
  font-size: 52px;
`;
const claimSubHeader = css`
  color: ${bodyGrey70};
  font-weight: 500;
`;
const claimInputContainer = css`
  width: 696px;
  display: flex;
  padding: 20px 24px;
  border-radius: 80px;
  border: 1px solid ${inputBorderGrey30};
  background: ${inputBackgroundGreen100};
`;
const claimInput = css`
  flex-grow: 1;
  border: 0;
  font: ${bodySmallSegment18};
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  background: transparent;
  color: ${inputTextGreen5};
  &::placeholder {
    color: ${inputTextGreen5};
  }
  &:focus {
    outline: none;
  }
`;

export default function ClaimCheck() {
  return (
    <div className={claimCheckContainer}>
      <div className={claimHeaderContainer}>
        <div className={claimSeason}>Season 1</div>
        <h1 className={claimHeader}>Check if you are eligible</h1>
        <div className={claimSubHeader}>
          Check if you are eligible to claim TAHO tokens
        </div>
      </div>
      <div className={claimInputContainer}>
        <input className={claimInput} placeholder="Address / Ens / Uns..." />
        <Button size="large">Check eligibility</Button>
      </div>
    </div>
  );
}
