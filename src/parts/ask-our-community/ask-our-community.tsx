import { css } from "linaria";
import { semanticSuccess } from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React from "react";

export function AskOurCommunity() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}

        background: right / 70% auto no-repeat
            url(${require("./ask-our-community-avatars.png")}),
          right / 100% auto no-repeat
            url(${require("./ask-our-community-circles.svg")});
        padding: 18rem 0 0;
        text-align: center;
      `}
    >
      <div
        className={css`
          ${styles.darkTextContainer}
          padding: 4rem 0 8rem;
          padding-right: 50%;
          text-align: left;
        `}
      >
        <h2>Ask our community</h2>
        <p
          className={css`
            padding-right: 9rem;
          `}
        >
          Didn&rsquo;t find what you were looking for?
          <br />
          Your community is most likely going to be able to answer any question
          you might have!
        </p>
        <a
          className={css`
            ${styles.buttonLayout}
            ${styles.buttonShadow}
            ${styles.buttonFont}

            display: inline-block;
            background-color: ${semanticSuccess};
            margin: 4rem 0;

            &::after {
              content: "";
              background: right / auto no-repeat
                url("./ask-our-community-discord-icon.svg");
              padding-left: 2rem;
            }
          `}
          href="https://chat.tally.cash"
          target="_blank"
        >
          Join Discord
        </a>
      </div>
    </div>
  );
}
