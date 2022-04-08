import React, { ReactNode } from "react";

export interface FAQ {
  question: ReactNode;
  answer: ReactNode;
}

export const faqs: FAQ[] = [
  { question: <>I don&rsquo;t seem to have a drop?</>, answer: <>TODO</> },
  {
    question: <>How many addresses can i check?</>,
    answer: (
      <>
        <p>
          You can check an unlimited amount of addresses. Fastest way to do so
          is by adding them as read only and upgrading after if you see a claim
          or would like to use Tally Ho.
        </p>

        <p>
          If you&rsquo;ve DeFi before, there is a high chance that you&rsquo;ll
          be in the drop. (
          <a target="_blank" href="#TODO">
            click here
          </a>{" "}
          for more info on who&rsquo;s in the airdrop).
          <br />
          Wallets created inside Tally Ho are not part of the drop.
        </p>
      </>
    ),
  },
  { question: <>Who is part of the airdrop?</>, answer: <>TODO</> },
  { question: <>How can i earn some DOGGO?</>, answer: <>TODO</> },
  {
    question: <>Bonus code was not applied, what can i do?</>,
    answer: <>TODO</>,
  },
  {
    question: <>I created a wallet in Tally Ho, can it be airdropped?</>,
    answer: <>TODO</>,
  },
  {
    question: <>Can i check elsewhere if i have a claim?</>,
    answer: <>TODO</>,
  },
];
