import { region19, region22, region4, region7, region9 } from "./regions-data"

export const MAP_BOX = {
  width: 6085,
  height: 3944,
}

export const regions = [region4, region7, region9, region19, region22]

export const REGIONS_COUNT = regions.length

export function getRegionData(regionId: string): (typeof regions)[number] {
  const pathData = regions.find((region) => region.id === regionId)

  if (!pathData) {
    throw new Error(`Missing data for region ${regionId}`)
  }

  return pathData
}
