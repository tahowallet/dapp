import { REALMS_MAP_DATA } from "shared/constants"
import { RealmMapData } from "shared/types"

// eslint-disable-next-line import/prefer-default-export
export function getCurrentRealmMapData(id: string): RealmMapData | undefined {
  return REALMS_MAP_DATA.find((realm) => realm.id === id)
}
