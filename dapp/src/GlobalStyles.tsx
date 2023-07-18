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
          --hunter-green: #002825;
          --green120: #00211e;
          --green95: #013834;
          --green80: #074b48;
          --green60: #497270;
          --green40: #7da19f;
          --green20: #b8d1d0;
          --green5: #ebfffe;

          --trophy-gold: #ef9c32;
          --gold120: #b57017;
          --gold80: #f0ac55;
          --gold60: #efbf81;
          --gold40: #f5dab7;
          --gold20: #fbedda;
          --gold5: #fdf6ed;

          --offWhite: #fefefc;
          --grey80: #464644;
          --grey60: #73726f;
          --grey40: #a09f9b;
          --grey20: #cdcbc6;

          --semanticError: #ec3137;
          --semanticSuccess: #21c580;
          --semanticAttention: #f2b824;
          --semanticInfo: #3cc5ee;
          --semanticError30: #da3c414d;
          --semanticSuccess30: #20c5804d;
          --semanticAttention30: #f2b8244d;
          --semanticInfo30: #3cc5ee4d;
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
