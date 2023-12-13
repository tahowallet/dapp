/* eslint-disable import/prefer-default-export */
import { createContext, MutableRefObject } from "react"
import { IslandContextType } from "shared/types"

export const IslandContext = createContext<MutableRefObject<IslandContextType>>(
  {
    current: {
      onRealmClick: () => {},
    },
  }
)
