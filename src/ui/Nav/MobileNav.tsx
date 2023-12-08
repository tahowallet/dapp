import React from "react"
import logoIcon from "shared/assets/nav_logo.svg"
import Icon from "shared/components/Media/Icon"
import { useResetTenderlyFork } from "shared/hooks"
import NavContainer from "./NavContainer"

export default function MobileNav() {
  const resetTenderlyFork = useResetTenderlyFork()

  return (
    <NavContainer>
      <Icon
        src={logoIcon}
        type="image"
        height="32px"
        width="154px"
        onClick={resetTenderlyFork}
      />
    </NavContainer>
  )
}
