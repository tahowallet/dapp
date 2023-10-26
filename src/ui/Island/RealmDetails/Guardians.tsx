import React from "react"
import placeholderGuardians from "shared/assets/placeholder-guardians.png"
import RealmDetailsPlaceholder from "./Placeholder"

export default function Guardians() {
  return (
    <RealmDetailsPlaceholder
      title="Coming in Season 1"
      imageSrc={placeholderGuardians}
    />
  )
}
