import { css } from "linaria";
import { faqs } from "parts/dummy-faqs";
import * as styles from "parts/layout/styles";
import React from "react";
import { FaqsLayout } from "../../faqs/faqs-layout";

export function SupportFaqs() {
  return (
    <div
      className={css`
        ${styles.sectionNarrowLayout}
        text-align: center;
      `}
    >
      <div
        className={css`
          ${styles.darkGoldTextContainer}
          margin: 6rem 0;
        `}
      >
        <h2>Frequently asked questions</h2>
      </div>
      <FaqsLayout faqs={faqs} />
    </div>
  );
}
