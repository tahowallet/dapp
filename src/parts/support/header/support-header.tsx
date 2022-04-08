import { css } from "linaria";
import { semanticSuccess } from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React from "react";

export function SupportHeader() {
  return (
    <div
      className={css`
        ${styles.sectionNarrowLayout}
        ${styles.darkTextContainer}
  
        text-align: left;
        padding-right: 24rem;
      `}
    >
      <h2>Support</h2>
      <p>
        We are sorry you got to this page, hopefully you are just browsing and
        don&rsquo;t really need it.
      </p>
      <p>
        But if you do, we suggest you start by reading our Tally documentations
        and going through our FAQ section.
      </p>
      <a
        className={css`
          display: inline-block;
          background-color: ${semanticSuccess};

          ${styles.buttonLayout}
          ${styles.buttonFont}
          ${styles.buttonShadow}
        `}
        href="https://docs.tally.cash/"
        target="_blank"
      >
        Tally documentation
      </a>
    </div>
  );
}
