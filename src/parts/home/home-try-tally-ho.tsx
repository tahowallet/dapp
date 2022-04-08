import React from "react";
import * as styles from "parts/layout/styles";
import { css } from "linaria";

export function HomeTryTallyHo() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}
        ${styles.darkTextContainer}
        text-align: center;
      `}
    >
      <h2>Try Tally Ho now</h2>
      <p>A loyal friend for your favorite browser.</p>
    </div>
  );
}
