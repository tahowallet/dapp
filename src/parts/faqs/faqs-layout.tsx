import { css, cx } from "linaria";
import { FAQ } from "parts/dummy-faqs";
import { trophyGold } from "parts/layout/colors";
import { fontTitle36CssFragment } from "parts/layout/fonts";
import { mediumScreenQuery } from "parts/layout/layout";
import * as styles from "parts/layout/styles";
import React, { useState } from "react";

export function FaqsLayout({ faqs }: { faqs: FAQ[] }) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  return (
    <ul
      className={css`
        display: flex;
        flex-flow: column;
        gap: 1rem;
        margin: 0;
        padding: 0;
      `}
    >
      {faqs.map(({ question, answer }, i) => {
        const isOpen = selectedQuestion === i;
        const onToggle = () => setSelectedQuestion((x) => (x === i ? null : i));
        return (
          <li
            className={cx(
              css`
                ${styles.tileLayout}
                ${styles.tileLightBackground}
                ${styles.tileLowShadow}

                position: relative;
                list-style: none;
                text-align: left;

                &:hover,
                &.open {
                  ${styles.tileHighShadow}
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
                text-align: inherit;
                cursor: pointer;

                ${mediumScreenQuery} {
                  padding: 2rem;
                }

                ${styles.titleDarkColor}

                *:hover > &,
                  *.open > & {
                  ${styles.titleGoldColor}
                }
              `}
              onClick={onToggle}
            >
              <h4
                className={css`
                  flex: 1;
                  ${fontTitle36CssFragment}
                  margin: 0;
                `}
              >
                {question}
              </h4>
              <div
                className={css`
                  font-family: sans-serif;
                  font-weight: 100;
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
                  ${styles.bodyDarkColor}

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
      })}
    </ul>
  );
}
