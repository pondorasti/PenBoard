import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { bucketRef, taskRef } from "../api"
import { IBucket, ITask, Status } from "../interfaces"

// Types
const name = "penBoard"
type Buckets = { [_id: string]: IBucket }
interface PenBoardState {
  status: Status
  needRefresh: boolean

  saveOrUpdateStatus: Status
  deleteStatus: Status

  buckets: Buckets
}

// Async Thunk
export const fetchBuckets = createAsyncThunk(`${name}/fetchBuckets`, async () => {
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

export const createTask = createAsyncThunk(`${name}/createTask`, async (payload: any) => {
  const response = await fetch(taskRef, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()

  return
})

export const deleteTask = createAsyncThunk(`${name}/deleteTask`, async (taskId: string) => {
  const response = await fetch(`${taskRef}/${taskId}`, {
    method: "DELETE",
  })
  const data = await response.json()

  return
})

// Initial State
const initialState: PenBoardState = {
  status: "idle",
  needRefresh: false,

  saveOrUpdateStatus: "idle",
  deleteStatus: "idle",

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
    // Fetch Buckets
    builder.addCase(fetchBuckets.pending, (state, action) => {
      state.status = "pending"
      state.needRefresh = false
    })
    builder.addCase(fetchBuckets.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.buckets = action.payload
    })
    builder.addCase(fetchBuckets.rejected, (state, action) => {
      state.status = "failed"
    })
    // Create Task
    builder.addCase(createTask.pending, (state, action) => {
      state.saveOrUpdateStatus = "pending"
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.saveOrUpdateStatus = "idle"
      state.needRefresh = true
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.saveOrUpdateStatus = "failed"
    })
    // Delete Task
    builder.addCase(deleteTask.pending, (state, action) => {
      state.deleteStatus = "pending"
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.deleteStatus = "idle"
      state.needRefresh = true
    })
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.deleteStatus = "failed"
    })
  },
})

// Selectors
export const selectBuckets = (state: RootState) => state.penBoard.buckets
export const selectStatus = (state: RootState) => state.penBoard.status
export const selectNeedsRefresh = (state: RootState) => state.penBoard.needRefresh
export const selectSaveOrUpdateStatus = (state: RootState) => state.penBoard.saveOrUpdateStatus
export const selectDeleteStatus = (state: RootState) => state.penBoard.deleteStatus

// Slice Reducer
export default penBoardSlice.reducer
