import React from "react"

export default function Nav(): JSX.Element {
  return (
    <div className="nav_container">
      <div>
        <nav>
          <button type="button">Home</button>
          <button type="button">About</button>
          <button type="button">Contact</button>
        </nav>
      </div>
      <div>Taho logo</div>
      <div>
        <button type="button">
          <img />
          Connect Taho wallet
        </button>
      </div>
      <style jsx>
        {`
          .nav_container {
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            width: 100vw;
            justify-content: space-between;
            z-index: 1;
          }
        `}
      </style>
    </div>
  )
}
