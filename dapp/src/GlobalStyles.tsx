import React from "react"
// need to import fonts through asset loader
/* eslint-disable import/no-relative-packages */
import QuincyCF from "../../src/shared/fonts/quincy-cf/quincy-cf.woff2"
import QuincyCFText from "../../src/shared/fonts/quincy-cf-text/quincy-cf-text.woff2"
import SegmentRegular from "../../src/shared/fonts/segment-regular/segment-regular.woff2"
import SegmentBold from "../../src/shared/fonts/segment-bold/segment-bold.woff2"
/* eslint-enable import/no-relative-packages */

export default function GlobalStyles() {
  return (
    <style jsx global>
      {`
        * {
          box-sizing: border-box;
          margin: unset;
        }

        :root {
          --primary-p1-100: #0d2321;

          --primary-p2-120: #b57017;
          --primary-p2-100: #ed9a26;
          --primary-p2-80: #f0ac55;

          --secondary-s1-100: #e4eeee;
          --secondary-s1-70: rgba(228, 238, 238, 0.7);
          --secondary-s1-40: rgba(228, 238, 238, 0.4);
          --secondary-s1-30: rgba(228, 238, 238, 0.3);

          --offWhite: #fefefc;

          --green-5: #d6eae9;

          --semantic-success: #20c580;
        }

        a {
          color: inherit;
          text-decoration: inherit;
        }

        @font-face {
          font-family: "QuincyCF-Regular";
          src: url(${QuincyCF}) format("woff2");
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: "QuincyCF-Text";
          src: url(${QuincyCFText}) format("woff2");
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: "Segment-Regular";
          src: url(${SegmentRegular}) format("woff2");
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: "Segment-Bold";
          src: url(${SegmentBold}) format("woff2");
          font-weight: normal;
          font-style: normal;
        }
        html,
        body {
          height: 100%;
        }
      `}
    </style>
  )
}
/* eslint-enable global-require */
