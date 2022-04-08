import {
  green95,
  hunterGreen,
  textGreen20,
  textGreen40,
  textLight,
  trophyGold,
} from "parts/layout/colors";
import {
  segmentFontFamily,
  fontTitle36CssFragment,
  fontTitle50CssFragment,
} from "parts/layout/fonts";
import { mediumScreenQuery } from "parts/layout/layout";
import { css, cx } from "linaria";
import React, { ReactNode, useState } from "react";
import { faqs } from '../dummy-faqs';

export function ReferralFaq() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  return (
    <div
      className={css`
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        padding: 2rem 1rem;

        ${mediumScreenQuery} {
          padding: 2rem;
        }
      `}
    >
      <div
        className={css`
          margin: -40rem 0;
          padding: 40rem 0;

          ${mediumScreenQuery} {
            background: no-repeat top center / 40rem auto
                url(${require("../common/background-stars.svg")}),
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
