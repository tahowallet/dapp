import { nodePropertiesByZoneId } from "../shared/contracts/nodes"
import { zone19, zone22, zone4, zone7, zone9 } from "./zones-data"

export const MAP_BOX = {
  width: 6085,
  height: 3944,
}

export const zones = [zone4, zone7, zone9, zone19, zone22].map((zone) => ({
  ...zone,
  contract: nodePropertiesByZoneId[zone.id],
}))

export const ZONES_COUNT = zones.length

export function getZoneData(zoneId: string): (typeof zones)[number] {
  const pathData = zones.find((zone) => zone.id === zoneId)

  if (!pathData) {
    throw new Error(`Missing data for zone ${zoneId}`)
  }

  return pathData
}
