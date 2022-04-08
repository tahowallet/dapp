import { css } from "linaria";
import { gold5, trophyGold } from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React, { ReactNode } from "react";

export function LaunchClaim() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}
        ${styles.darkTextContainer}
    
        text-align: center;
      `}
    >
      <h2>
        Ready to claim?
        <br />
        Here&rsquo;s how.
      </h2>
      <ol
        className={css`
          display: grid;
          grid: auto / auto-flow 1fr;
          gap: 1rem;
          padding: 4rem 0;
        `}
      >
        <Step
          title={
            <>
              Install
              <br />
              Tally Ho
            </>
          }
          imageSrc={require("./launch-claim-step-1-download.svg")}
          body={<>Install on your preferred browser.</>}
        />
        <Step
          title={
            <>
              Add a
              <br />
              wallet address
            </>
          }
          imageSrc={require("./launch-claim-step-2-add-address.svg")}
          body={
            <>
              Import a wallet you&rsquo;ve used before or try read-only mode for
              a quick check.
            </>
          }
        />
        <Step
          title={
            <>
              Claim your
              <br />
              DOGGO
            </>
          }
          imageSrc={require("./launch-claim-step-3-claim.svg")}
          body={<>If you are a part of the drop, a bonus will be applied.</>}
        />
      </ol>
    </div>
  );
}

function Step({
  title,
  imageSrc,
  body,
}: {
  title: ReactNode;
  imageSrc: string;
  body: ReactNode;
}) {
  return (
    <li
      className={css`
        ${styles.tileLayout}
        ${styles.tileLightBackground}
        ${styles.tileShadow}
        ${styles.darkGoldTextContainer}

        position: relative;
        display: flex;
        flex-flow: column;
        gap: 2rem;
        padding: 5rem 1rem 3rem;
        counter-increment: list-item;

        &::before {
          content: counter(list-item);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          margin: -1.5rem auto;
          width: 3rem;
          height: 3rem;
          line-height: 3rem;
          display: block;
          border-radius: 1.5rem;
          border: 1px solid ${trophyGold};
          background: ${gold5};
        }
      `}
    >
      <h3>{title}</h3>
      <img
        src={imageSrc}
        className={css`
          width: 100%;
        `}
      />
      <p
        className={css`
          max-width: 20rem;
          margin: 0 auto;
        `}
      >
        {body}
      </p>
    </li>
  );
}
