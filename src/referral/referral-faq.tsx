import {
  green95,
  hunterGreen,
  textGreen20,
  textGreen40,
  textLight,
  trophyGold,
} from "layout/colors";
import {
  segmentFontFamily,
  fontTitle36CssFragment,
  fontTitle50CssFragment,
} from "layout/fonts";
import { mediumScreenQuery } from "layout/layout";
import { css, cx } from "linaria";
import React, { ReactNode, useState } from "react";

const faqs: Array<{ question: ReactNode; answer: ReactNode }> = [
  { question: <>I don&rsquo;t seem to have a drop?</>, answer: <>TODO</> },
  {
    question: <>How many addresses can i check?</>,
    answer: (
      <>
        <p>
          You can check an unlimited amount of addresses. Fastest way to do so
          is by adding them as read only and upgrading after if you see a claim
          or would like to use Tally.
        </p>

        <p>
          If you&rsquo;ve DeFi before, there is a high chance that you&rsquo;ll
          be in the drop. (
          <a target="_blank" href="#TODO">
            click here
          </a>{" "}
          for more info on who&rsquo;s in the airdrop).
          <br />
          Wallets created inside Tally are not part of the drop.
        </p>
      </>
    ),
  },
  { question: <>Who is part of the airdrop?</>, answer: <>TODO</> },
  { question: <>How can i earn some Tally?</>, answer: <>TODO</> },
  {
    question: <>Bonus code was not applied, what can i do?</>,
    answer: <>TODO</>,
  },
  {
    question: <>I created a wallet in Tally, can it be airdropped?</>,
    answer: <>TODO</>,
  },
  {
    question: <>Can i check elsewhere if i have a claim?</>,
    answer: <>TODO</>,
  },
];

export function ReferralFaq() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  return (
    <div
      className={css`
        width: 100%;
        max-width: 64rem;
        margin: 0 auto -20vw;
        padding: 2rem 1rem;

        ${mediumScreenQuery} {
          padding: 4rem 2rem;
        }
      `}
    >
      <div
        className={css`
          position: relative;
          z-index: -1;
          margin: -52rem 0;
          padding: 52rem 0;

          ${mediumScreenQuery} {
            background: no-repeat top center / 40rem auto
                url(${require("../ce/ce-dao-background-stars.svg")}),
              ${hunterGreen};
          }
        `}
      />
      <h2
        className={css`
          margin: 2rem 0;
          ${fontTitle50CssFragment}
          color: ${textLight};
          text-align: center;
        `}
      >
        Frequently asked questions
      </h2>
      <ul
        className={css`
          display: flex;
          flex-flow: column;
          gap: 1rem;
          margin: 0;
          padding: 0;
        `}
      >
        {faqs.map(({ question, answer }, i) => (
          <Question
            question={question}
            answer={answer}
            isOpen={selectedQuestion === i}
            onToggle={() => setSelectedQuestion((x) => (x === i ? null : i))}
          />
        ))}
      </ul>
    </div>
  );
}

function Question({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: ReactNode;
  answer: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      className={cx(
        css`
          position: relative;
          list-style: none;
          border: 1px solid ${green95};
          background: ${hunterGreen};

          box-shadow: 0px 16px 16px rgba(0, 20, 19, 0.04),
            0px 6px 8px rgba(0, 20, 19, 0.14), 0px 2px 4px rgba(0, 20, 19, 0.24);
          border-radius: 1rem;

          &:hover,
          &.open {
            background: ${green95};
          }
        `,
        isOpen && "open"
      )}
    >
      <button
        className={css`
          appearance: none;
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          width: 100%;
          margin: unset;
          padding: 1.5rem;
          background: unset;
          border: unset;
          color: ${textGreen20};
          text-align: inherit;
          cursor: pointer;

          ${mediumScreenQuery} {
            padding: 2rem;
          }

          *:hover > &,
          *.open > & {
            color: ${trophyGold};
          }
        `}
        onClick={onToggle}
      >
        <h3
          className={css`
            flex: 1;
            ${fontTitle36CssFragment}
            margin: 0;
          `}
        >
          {question}
        </h3>
        <div
          className={css`
            font-size: 4rem;
            font-size: clamp(2rem, 10vw, 4rem);
            line-height: 0.625em;
          `}
        >
          {isOpen && <>&times;</>}
          {!isOpen && <>+</>}
        </div>
      </button>
      {isOpen && (
        <div
          className={css`
            padding: 1.5rem;
            font: 18px / 26px ${segmentFontFamily};
            color: ${textGreen40};

            ${mediumScreenQuery} {
              padding: 2rem;
            }

            a {
              color: ${trophyGold};
            }
          `}
        >
          {answer}
        </div>
      )}
    </li>
  );
}
