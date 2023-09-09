import React from "react"

export default function ClaimProgressBar() {
  const styles: React.CSSProperties & Record<string, string> = {
    "--percent": "10%",
  }

  return (
    <div style={styles} className="progress_bar">
      <div className="progress">
        <div className="progress_bg" />
        <div className="tooltip">
          <svg
            className="tooltip_arrow"
            width="30"
            height="25"
            viewBox="0 0 30 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7321 24C15.9623 25.3333 14.0378 25.3333 13.268 24L1.1436 2.99999C0.373797 1.66666 1.33605 -6.58285e-06 2.87565 -6.44825e-06L27.1244 -4.32836e-06C28.664 -4.19377e-06 29.6262 1.66666 28.8564 3L16.7321 24Z"
              fill="var(--primary-p1-80)"
            />
          </svg>
          <span className="title">$TAHO Claimed</span>
          <span className="content">{Intl.NumberFormat().format(324132)}</span>
        </div>
      </div>
      <div className="bar_text">
        Available: 3,827,297 $TAHO
        <span className="dot" />
      </div>
      <style jsx>{`
        .tooltip {
          position: absolute;
          bottom: 0;
          left: var(--percent);
          z-index: 2;
          background: var(--primary-p1-80);
          display: flex;
          border-radius: 4px;
          flex-direction: column;
          align-items: center;
          padding: 6px 8px;
          margin-bottom: 22px;
          margin-left: -11px;
          word-break: keep-all;
          white-space: nowrap;
          transform: translateX(-50%);
          filter: drop-shadow(0px 2px 4px rgba(7, 17, 17, 0.34))
            drop-shadow(0px 6px 8px rgba(7, 17, 17, 0.24))
            drop-shadow(0px 16px 16px rgba(7, 17, 17, 0.3));
        }

        .tooltip_arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-11px);
          z-index: -1;
        }

        .tooltip .title {
          font: var(--text-label);
          color: var(--secondary-s1-70);
        }

        .tooltip .content {
          font: var(--text-body);
          color: var(--secondary-s1-100);
        }
        .progress_bar {
          position: absolute;
          width: 600px;
          height: 40px;
          display: flex;
          align-items: center;
          flex-direction: row;
          left: 50%;
          bottom: 34px;
          padding: 10px 12px;
          border-radius: 48px;
          transform: translateX(-50%);
          background: var(--primary-p1-120);
        }

        .progress {
          position: relative;
          width: 100%;
        }

        .progress_bg {
          position: relative;
          border-radius: 48px;
          background: var(--semantic-success);
          height: 20px;
          width: var(--percent);
          min-width: 24px;
          overflow: hidden;
        }

        .progress_bg::before {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--primary-p1-120);
          border-radius: 50%;
          z-index: 1;
        }

        .progress_bg::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #fff0, #1ba269, #fff0);
          top: 0;
          left: 0;
          animation: moving-highlight 3s ease-in-out infinite;
          opacity: 0.6;
        }

        .bar_text {
          position: absolute;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: auto;
          right: 16px;
          color: var(--secondary-s1-70);
          font: var(--text-label);
          word-break: keep-all;
          white-space: nowrap;
          user-select: none;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: var(--semantic-success);
          border-radius: 50%;
          display: inline-block;
          margin-left: 8px;
        }

        @keyframes moving-highlight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
