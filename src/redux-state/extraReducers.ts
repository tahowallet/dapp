import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { IslandState } from "redux-state"
import { fetchPopulation, initRealmsDataFromContracts } from "./thunks/island"

const extraReducers = (builder: ActionReducerMapBuilder<IslandState>) => {
  builder.addCase(initRealmsDataFromContracts.pending, (immerState) => {
    immerState.loaderType = "realms"
  })
  builder.addCase(fetchPopulation.pending, (immerState) => {
    immerState.loaderType = "population"
  })
}

export default extraReducers
