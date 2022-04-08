import { Header } from "parts/header/header";
import { textGreen20, trophyGold } from "parts/layout/colors";
import { segmentFontFamily } from "parts/layout/fonts";
import { Layout } from "parts/layout/layout";
import * as styles from "parts/layout/styles";
import { css } from "linaria";
import React, { ReactNode } from "react";

export default function LegalLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Layout>
      <Header />
      <div
        className={css`
          margin: 0 auto;
          padding: 6rem 1rem 0;
          max-width: 48rem;
          font: 18px / 1.44 ${segmentFontFamily};
          ${styles.darkTextContainer}

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 2em 0 1em;
          }

          h1 {
            text-align: center;
            margin: 1rem 0;
          }

          h1 + p {
            text-align: center;
            margin: 1rem 0 4rem;
            font-size: 14px;
          }

          h2 {
            margin: 4rem 0 2rem;
            font-size: 36px;
          }

          li::marker {
            content: "· ";
            font-weight: 900;
          }

          a {
            color: ${trophyGold};
            text-decoration: unset;
          }

          table {
            border-collapse: collapse;
          }

          td,
          th {
            border: solid 1px ${textGreen20};
            padding: 0.5rem 1rem;
          }

          td > ul {
            padding-left: 1rem;
          }
        `}
      >
        {children}
      </div>
    </Layout>
  );
}
