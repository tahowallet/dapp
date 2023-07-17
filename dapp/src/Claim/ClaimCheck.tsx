import React from "react"
import Button from "../shared/Button"
import icon from "../shared/assets/icons/discord.svg"

const onClick = () => console.log("clicked")

export default function ClaimCheck() {
  return (
    <>
      <div className="check_container">
        <div className="header_container">
          <div>Season 1</div>
          <h1>Check if you are eligible</h1>
          <div>Check if you are eligible to claim TAHO tokens</div>
        </div>
        <div>
          <input placeholder="Address / Ens / Uns..." />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            Primary
            <Button
              onClick={onClick}
              iconPosition="left"
              iconSrc={icon}
              type="primary"
            >
              Button
            </Button>
            <Button onClick={onClick} iconSrc={icon} type="primary" isDisabled>
              Button
            </Button>
            <Button
              onClick={onClick}
              iconSrc={icon}
              type="primary"
              size="large"
            >
              Button
            </Button>
            <Button
              onClick={onClick}
              iconSrc={icon}
              type="primary"
              size="large"
              isDisabled
            >
              Button
            </Button>
            Secondary
            <Button onClick={onClick} iconSrc={icon} type="secondary">
              Button
            </Button>
            <Button
              onClick={onClick}
              iconSrc={icon}
              type="secondary"
              isDisabled
            >
              Button
            </Button>
            <Button
              onClick={onClick}
              iconSrc={icon}
              type="secondary"
              size="large"
            >
              Button
            </Button>
            <Button
              onClick={onClick}
              iconSrc={icon}
              type="secondary"
              size="large"
              isDisabled
            >
              Button
            </Button>
            Tertiary
            <Button onClick={onClick} iconSrc={icon} type="tertiary">
              Button
            </Button>
            <Button onClick={onClick} iconSrc={icon} type="tertiary" isDisabled>
              Button
            </Button>
            <Button
              onClick={onClick}
              iconSrc={icon}
              type="tertiary"
              size="large"
            >
              Button
            </Button>
            <Button
              onClick={onClick}
              iconSrc={icon}
              type="tertiary"
              size="large"
              isDisabled
            >
              Button
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .check_container {
          padding: 40px 106px 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .header_container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  )
}
