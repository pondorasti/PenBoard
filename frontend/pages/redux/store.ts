import { configureStore } from "@reduxjs/toolkit"
import penBoardReducer from "./penBoardSlice"

export const store = configureStore({
  reducer: {
    penBoard: penBoardReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
