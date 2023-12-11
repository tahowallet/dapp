import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { IslandState } from "redux-state"
import { fetchPopulation, initRealmsDataFromContracts } from "./thunks/island"

const extraReducers = (builder: ActionReducerMapBuilder<IslandState>) => {
  builder.addCase(initRealmsDataFromContracts.pending, (immerState) => {
    immerState.loaderType = "realms"
  })
  builder.addCase(initRealmsDataFromContracts.fulfilled, (immerState) => {
    immerState.loaderType = null
  })
  builder.addCase(fetchPopulation.pending, (immerState) => {
    immerState.loaderType = "population"
  })
  builder.addCase(fetchPopulation.fulfilled, (immerState) => {
    immerState.loaderType = null
  })
}

export default extraReducers
