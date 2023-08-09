import React from "react"
import QuincyCFMedium from "./shared/fonts/quincy-cf.woff2"
import QuincyCF from "./shared/fonts/quincy-cf-text.woff2"
import QuincyCFBold from "./shared/fonts/quincy-cf-bold.woff2"
import SegmentRegular from "./shared/fonts/segment-regular.woff2"
import SegmentMedium from "./shared/fonts/segment-medium.woff2"
import SegmentSemiBold from "./shared/fonts/segment-semibold.woff2"
import SegmentBold from "./shared/fonts/segment-bold.woff2"

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

          --secondary-s1-100: rgb(228, 238, 238);
          --secondary-s1-80: rgba(228, 238, 238, 0.8);
          --secondary-s1-70: rgba(228, 238, 238, 0.7);
          --secondary-s1-60: rgba(228, 238, 238, 0.6);
          --secondary-s1-50: rgba(228, 238, 238, 0.5);
          --secondary-s1-40: rgba(228, 238, 238, 0.4);
          --secondary-s1-30: rgba(228, 238, 238, 0.3);
          --secondary-s1-10: rgba(228, 238, 238, 0.1);

          --off-white: #f7f9f9;

          --green-5: #d6eae9;

          --semantic-success: #20c580;
          --semantic-attention: #f2b824;
          --semantic-info: #3cc5ee;

          --trading-in: #11bea9;

          --serif: "QuincyCF", serif;
          --sans: "Segment", sans-serif;

          /* z-index */
          --z-map: 0;
          --z-modal: 100;
          --z-navigation: 110;
          --z-overlay: 120;

          /* wallet connect overrides */
          --onboard-warning-100: var(--secondary-s1-100);
          --onboard-warning-400: var(--secondary-s1-40);
          --onboard-connect-content-width: 500px;
          --onboard-modal-z-index: 200;
          --onboard-account-select-modal-z-index: 210;
          --wcm-z-index: 210 !important;
        }

        a {
          color: inherit;
          text-decoration: inherit;
        }

        @font-face {
          font-family: "QuincyCF";
          src: url(${QuincyCFMedium}) format("woff2");
          font-weight: 500;
          font-style: normal;
        }

        @font-face {
          font-family: "QuincyCF";
          src: url(${QuincyCF}) format("woff2");
          font-weight: 400;
          font-style: normal;
        }

        @font-face {
          font-family: "QuincyCF";
          src: url(${QuincyCFBold}) format("woff2");
          font-weight: 700;
          font-style: normal;
        }

        @font-face {
          font-family: "Segment";
          src: url(${SegmentRegular}) format("woff2");
          font-weight: 400;
          font-style: normal;
        }

        @font-face {
          font-family: "Segment";
          src: url(${SegmentMedium}) format("woff2");
          font-weight: 500;
          font-style: normal;
        }

        @font-face {
          font-family: "Segment";
          src: url(${SegmentSemiBold}) format("woff2");
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: "Segment";
          src: url(${SegmentBold}) format("woff2");
          font-weight: 700;
          font-style: normal;
        }

        html,
        body {
          height: 100%;
          font-family: var(--sans);
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px;
          color: var(--off-white);
        }
        input:focus {
          outline: none;
        }
        h1 {
          font-family: var(--serif);
          font-size: 42px;
          font-style: normal;
          font-weight: 500;
          line-height: 46px;
          letter-spacing: 1px;
        }
        .column_center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .column {
          display: flex;
          flex-direction: column;
        }
        .row {
          display: flex;
        }
        .ellipsis {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}
    </style>
  )
}
