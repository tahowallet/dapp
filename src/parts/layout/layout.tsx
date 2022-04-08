import { css } from "linaria";
import "normalize.css";
import { Footer } from "parts/footer/footer";
import { FooterNav } from "parts/footer/footer-nav";
import { canvas } from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React, { ReactNode } from "react";

export const largeScreenQuery = `@media (min-width: 80rem)`;
export const mediumScreenQuery = `@media (min-width: 48rem)`;

css`
  :global() {
    html {
      height: 100vh;
      background: ${canvas};
      scroll-behavior: smooth;
    }

    * {
      box-sizing: border-box;
    }

    a {
      color: inherit;
      text-decoration: inherit;
    }
  }
`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        className={css`
          display: flex;
          flex-flow: column;
        `}
      >
        {children}
      </div>
      <FooterNav />
      <Footer />
    </>
  );
}

export function Layout2({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        className={css`
          display: flex;
          flex-flow: column;

          ${styles.bodyFont}

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 0;
          }

          p {
            margin-block: 0.5rem;
          }

          h1 {
            ${styles.title1Font}
          }

          h2 {
            ${styles.title2Font}
          }

          h3 {
            ${styles.title3Font}
          }

          h4 {
            ${styles.title4Font}
          }
        `}
      >
        {children}
      </div>
      <FooterNav />
      <Footer />
    </>
  );
}
