import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { bucketRef } from "../api"
import { IBucket, Status } from "../interfaces"

// Types
const name = "penBoard"
type Buckets = { [_id: string]: IBucket }
interface PenBoardState {
  status: Status
  buckets: Buckets
}

// Async Thunk
export const fetchBuckets = createAsyncThunk(`${name}/fetch`, async () => {
  // const response = fetch
  const response = await fetch(bucketRef)
  const data = await response.json()

  const bucketsArr: IBucket[] = data["buckets"]
  const bucketsObj: Buckets = {}
  for (let item of bucketsArr) {
    const key = item.index.toString()
    bucketsObj[key] = item
  }

  return bucketsObj
})

// Initial State
const initialState: PenBoardState = {
  status: "idle",
  buckets: {
    "0": {
      _id: "3",
      name: "ToDo",
      index: 0,
      tasks: [
        { _id: "1", title: "First task", bucketId: "3" },
        { _id: "2", title: "Second task", bucketId: "3" },
      ],
    },
    "1": {
      _id: "4",
      name: "In-Progress",
      index: 1,
      tasks: [
        { _id: "3", title: "Third task", bucketId: "4" },
        { _id: "4", title: "Forth task", bucketId: "4" },
      ],
    },
    "2": {
      _id: "5",
      name: "In-Progress",
      index: 2,
      tasks: [
        { _id: "3", title: "Third task", bucketId: "4" },
        { _id: "4", title: "Forth task", bucketId: "4" },
      ],
    },
    "3": {
      _id: "6",
      name: "Done",
      index: 3,
      tasks: [
        { _id: "5", title: "Third task", bucketId: "4" },
        { _id: "6", title: "Forth task", bucketId: "4" },
      ],
    },
  },
}

// Slice
const penBoardSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBuckets.pending, (state, action) => {
      state.status = "pending"
    })
    builder.addCase(fetchBuckets.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.buckets = action.payload
    })
    builder.addCase(fetchBuckets.rejected, (state, action) => {
      state.status = "failed"
    })
  },
})

// Selectors
export const selectBuckets = (state: RootState) => state.penBoard.buckets
export const selectStatus = (state: RootState) => state.penBoard.status

// Slice Reducer
export default penBoardSlice.reducer
