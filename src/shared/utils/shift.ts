export function getPinShift(realmId: string) {
  switch (realmId) {
    case "4":
      return { x: 200, y: 300 }
    case "7":
      return { x: 500, y: 300 }
    case "8":
      return { x: 700, y: 450 }
    case "9":
      return { x: 500, y: 300 }
    case "15":
      return { x: 600, y: 300 }
    case "16":
      return { x: 200, y: 600 }
    case "19":
      return { x: 250, y: 250 }
    case "22":
      return { x: 200, y: 250 }
    default:
      return { x: 250, y: 250 }
  }
}

export function getNewRealmLabelShift(realmId: string) {
  switch (realmId) {
    case "8":
      return { x: 20, y: 170 }
    case "15":
      return { x: 40, y: 290 }
    default:
      return { x: 0, y: 0 }
  }
}

export function getNewChallengeLabelShift(realmId: string) {
  switch (realmId) {
    case "4":
      return { x: 100, y: 250 }
    case "7":
      return { x: 900, y: 300 }
    case "8":
      return { x: 850, y: 300 }
    case "9":
      return { x: 850, y: 350 }
    case "15":
      return { x: 880, y: 110 }
    case "19":
      return { x: 250, y: 600 }
    case "22":
      return { x: 600, y: 150 }
    default:
      return { x: 0, y: 0 }
  }
}
