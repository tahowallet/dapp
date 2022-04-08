import { Link } from "gatsby";
import { css } from "linaria";
import { textGreen60 } from "parts/layout/colors";
import { quincyRegularFontFamily } from "parts/layout/fonts";
import React from "react";

export function Footer() {
  return (
    <div
      className={css`
        padding: 0 0 6rem;
        font-family: ${quincyRegularFontFamily};
        font-size: 12px;
        color: ${textGreen60};
        text-align: center;
      `}
    >
      © {new Date().getFullYear()} Tally Ho! &nbsp;|&nbsp; *A{" "}
      <Link target="_blank" to="https://thesis.co/">
        Thesis
      </Link>{" "}
      Build &nbsp;|&nbsp;{" "}
      <Link target="_blank" to="/privacy">
        Privacy policy
      </Link>
      <p>
        The Tally Ho Wallet is not affiliated with dAppHero and/or the Tally
        voting dashboard and blockchain governance platform at
        <i>withtally.com</i>.
      </p>
    </div>
  );
}
