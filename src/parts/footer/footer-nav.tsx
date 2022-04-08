import { Link } from "gatsby";
import { css } from "linaria";
import { NavLinks } from "parts/common/nav";
import { textCanvas40, textGreen40 } from "parts/layout/colors";
import { quincyRegularFontFamily } from "parts/layout/fonts";
import React from "react";

export function FooterNav() {
  return (
    <div
      className={css`
        text-align: center;
        padding: 6rem 0 0;
      `}
    >
      <Link to="/">
        <img width="168" height="127" src={require("./footer-logo.svg")} />
        <div
          className={css`
            margin: 1rem 0;
            font: 400 24px ${quincyRegularFontFamily};
            letter-spacing: 0.2em;
            color: ${textGreen40};
          `}
        >
          TALLY HO!
        </div>
      </Link>
      <div
        className={css`
          display: flex;
          flex-flow: row wrap;
          gap: 2rem 0;
          align-items: center;
          justify-content: center;
          margin: 2rem;
          color: ${textCanvas40};
        `}
      >
        <NavLinks />
      </div>
    </div>
  );
}
