import React from "react"
import QuincyCFMedium from "shared/fonts/quincy-cf.woff2"
import QuincyCF from "shared/fonts/quincy-cf-text.woff2"
import QuincyCFBold from "shared/fonts/quincy-cf-bold.woff2"
import SegmentRegular from "shared/fonts/segment-regular.woff2"
import SegmentMedium from "shared/fonts/segment-medium.woff2"
import SegmentSemiBold from "shared/fonts/segment-semibold.woff2"
import SegmentBold from "shared/fonts/segment-bold.woff2"

export default function GlobalStyles() {
  return (
    <style jsx global>
      {`
        * {
          box-sizing: border-box;
          margin: unset;
        }

        #root {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        :root {
          --primary-p1-120: #071111;
          --primary-p1-100: #0d2321;
          --primary-p1-80: #063f3d;
          --primary-p1-60: #315a5a;
          --primary-p1-40: #0d232166;

          --primary-p1-100-60: rgb(13, 35, 33, 0.6);
          --primary-p1-100-40: rgb(13, 35, 33, 0.4);

          --primary-p2-120: #b57017;
          --primary-p2-100: #ed9a26;
          --primary-p2-80: #f0ac55;

          --secondary-s1-100: rgb(228, 238, 238);
          --secondary-s1-90: rgb(228, 238, 238, 0.9);
          --secondary-s1-80: rgba(228, 238, 238, 0.8);
          --secondary-s1-70: rgba(228, 238, 238, 0.7);
          --secondary-s1-60: rgba(228, 238, 238, 0.6);
          --secondary-s1-50: rgba(228, 238, 238, 0.5);
          --secondary-s1-40: rgba(228, 238, 238, 0.4);
          --secondary-s1-30: rgba(228, 238, 238, 0.3);
          --secondary-s1-20: rgba(228, 238, 238, 0.2);
          --secondary-s1-10: rgba(228, 238, 238, 0.1);

          --off-white: #f7f9f9;

          --green-5: #d6eae9;
          --green-40: #588382;
          --green-60: #315a5a;

          --semantic-success: #20c580;
          --semantic-attention: #f2b824;
          --semantic-info: #3cc5ee;
          --semantic-error: #ff6666;

          --close: #f66;

          --trading-in: #11bea9;
          --trading-in-20: #11bea933;
          --trading-out: #ff679d;

          /* Typography */
          --serif: "QuincyCF", serif;
          --sans: "Segment", sans-serif;

          --text-h1: 500 42px/110% var(--serif);
          --text-h2: 500 28px/114% var(--sans);
          --text-h2-alt: 500 32px/150% var(--serif);
          --text-h5: 400 16px/150% var(--sans);
          --text-label: 500 16px/24px var(--sans);
          --text-label-alt: 500 12px/16px var(--sans);
          --text-body: 500 18/24px var(--sans);
          --text-body-s: 500 14px/20px var(--sans);

          /* z-index */
          --z-island: 0;
          --z-navigation: 110;
          --z-controls: 115;
          --z-assistant-icon: 900;
          --z-full-page-loader: 950;
          --z-mobile-screen: 1000;

          /* Modals */
          --z-modal-island: 100;
          --z-modal-overlay: 120;

          /* wallet connect overrides */
          --onboard-warning-100: var(--secondary-s1-100);
          --onboard-warning-400: var(--secondary-s1-40);
          --onboard-connect-content-width: 500px;
          --onboard-modal-z-index: 200;
          --onboard-account-select-modal-z-index: 210;
          --wcm-z-index: 210 !important;
          --onboard-primary-500: var(--primary-p2-100);
          --onboard-primary-300: var(--primary-p2-80);

          /* background */
          --background-gradient: radial-gradient(
              57.41% 54.95% at 64.58% 47.64%,
              rgba(27, 97, 94, 0) 0%,
              rgba(27, 97, 94, 0.2) 100%
            ),
            linear-gradient(
              137deg,
              rgba(26, 94, 91, 0.9) 0%,
              rgba(26, 106, 103, 0) 100%
            ),
            rgba(6, 48, 46, 0.5);
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
          position: relative;
          height: 100%;
          width: 100%;
          font-family: var(--sans);
          font-style: normal;
          font-weight: 500;
          line-height: 24px;
          color: var(--off-white);
          overflow: hidden;

          // TODO: web3onboard modal takes root font size to adjust UI sizes
          // but some UI (for example loaders) look bad with 18px font size
          font-size: 16px;
        }

        body.overlay {
          background: #1c2928;
        }

        p,
        span,
        div,
        input,
        button,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-size: 18px;
        }
        input:focus {
          outline: none;
        }
        h1 {
          font-family: var(--serif);
          font-size: 42px;
          font-style: normal;
          font-weight: 700;
          line-height: 46px;
          letter-spacing: 1px;
        }
        h3 {
          font-family: var(--sans);
          font-size: 22px;
          font-style: normal;
          font-weight: 600;
          line-height: 32px;
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
        .row_center {
          display: flex;
          align-items: center;
        }
        .center {
          display: grid;
          place-items: center;
        }
        .ellipsis {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hidden {
          display: none;
        }
        .invisible {
          visibility: hidden;
        }
        .no_scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no_scrollbar::-webkit-scrollbar {
          display: none;
        }
        .button_reset {
          background: none;
          outline: none;
          border: none;
          cursor: pointer;
        }
      `}
    </style>
  )
}
