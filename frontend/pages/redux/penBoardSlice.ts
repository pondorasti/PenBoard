import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { IBucket } from "../interfaces"

// Types
const name = "penBoard"
interface PenBoardState {
  buckets: { [_id: string]: IBucket }
}

// Initial State
const initialState: PenBoardState = {
  buckets: {
    "3": {
      _id: "3",
      name: "ToDo",
      index: 0,
      tasks: [
        { _id: "1", title: "First task", bucketId: "3" },
        { _id: "2", title: "Second task", bucketId: "3" },
      ],
    },
    "4": {
      _id: "4",
      name: "Done",
      index: 1,
      tasks: [
        { _id: "3", title: "Third task", bucketId: "4" },
        { _id: "4", title: "Forth task", bucketId: "4" },
      ],
    },
  },
}

// Slice
const penBoardSlice = createSlice({ name, initialState, reducers: {}, extraReducers: {} })

// Selectors
export const selectBuckets = (state: RootState) => state.penBoard.buckets

// Slice Reducer
export default penBoardSlice.reducer
