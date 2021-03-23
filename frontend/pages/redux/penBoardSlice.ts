import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { bucketRef, taskRef } from "../api"
import { IBucket, ITask, Status } from "../interfaces"

// Types
const name = "penBoard"
type Buckets = { [_id: string]: IBucket }
interface PenBoardState {
  status: Status
  needRefresh: boolean

  showDialog: boolean
  dialogTask: ITask
  saveOrUpdateStatus: Status
  deleteStatus: Status

  buckets: Buckets
}

// Async Thunk
export const fetchBuckets = createAsyncThunk(`${name}/fetchBuckets`, async () => {
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

export const asyncUpdateBucketTasks = createAsyncThunk(
  `${name}/updateBucketTasks`,
  async ({ bucketId, tasks }: { bucketId: string; tasks: ITask[] }) => {
    const response = await fetch(`${bucketRef}/${bucketId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tasks),
    })
    const json = await response.json()
    const bucket: IBucket = json["bucket"]

    return bucket
  }
)

export const createTask = createAsyncThunk(`${name}/createTask`, async (payload: any) => {
  await fetch(taskRef, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return
})

export const updateTask = createAsyncThunk(
  `${name}/updateTask`,
  async ({ taskId, payload }: { taskId: string; payload: any }) => {
    const response = await fetch(`${taskRef}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()

    return taskId
  }
)

export const deleteTask = createAsyncThunk(`${name}/deleteTask`, async (taskId: string) => {
  await fetch(`${taskRef}/${taskId}`, {
    method: "DELETE",
  })

  return
})

// Initial State
const initialState: PenBoardState = {
  status: "idle",
  needRefresh: true,

  showDialog: false,
  dialogTask: { _id: "", title: "", bucketId: "" },
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
  reducers: {
    setDialogTask: {
      reducer(state, action: PayloadAction<ITask>) {
        state.dialogTask = action.payload
        state.showDialog = true
      },
      prepare(dialogTask: ITask) {
        return { payload: dialogTask }
      },
    },
    updateBucketTasks: {
      reducer(state, action: PayloadAction<{ bucketKey: string; tasks: ITask[] }>) {
        const bucketKey = action.payload.bucketKey
        state.buckets[bucketKey].tasks = action.payload.tasks
      },
      prepare(bucketKey: string, tasks: ITask[]) {
        return { payload: { bucketKey, tasks } }
      },
    },
    removeDialog(state) {
      state.showDialog = false
    },
  },
  extraReducers: (builder) => {
    // Fetch Buckets
    builder.addCase(fetchBuckets.pending, (state, action) => {
      if (state.status === "idle") {
        state.status = "pending"
      }
      state.needRefresh = false
    })
    builder.addCase(fetchBuckets.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.buckets = action.payload
    })
    // Create Task
    builder.addCase(createTask.pending, (state, action) => {
      state.saveOrUpdateStatus = "pending"
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.saveOrUpdateStatus = "idle"
      state.showDialog = false
      state.needRefresh = true
    })
    // Update Task
    builder.addCase(updateTask.pending, (state, action) => {
      state.saveOrUpdateStatus = "pending"
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.saveOrUpdateStatus = "idle"
      state.showDialog = false
      state.needRefresh = true
    })
    // Delete Task
    builder.addCase(deleteTask.pending, (state, action) => {
      state.deleteStatus = "pending"
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.deleteStatus = "idle"
      state.showDialog = false
      state.needRefresh = true
    })
  },
})

// Selectors
export const selectBuckets = (state: RootState) => state.penBoard.buckets
export const selectStatus = (state: RootState) => state.penBoard.status
export const selectNeedsRefresh = (state: RootState) => state.penBoard.needRefresh
export const selectShowDialog = (state: RootState) => state.penBoard.showDialog
export const selectDialogTask = (state: RootState) => state.penBoard.dialogTask
export const selectSaveOrUpdateStatus = (state: RootState) => state.penBoard.saveOrUpdateStatus
export const selectDeleteStatus = (state: RootState) => state.penBoard.deleteStatus

// Actions
export const { setDialogTask, removeDialog, updateBucketTasks } = penBoardSlice.actions

// Slice Reducer
export default penBoardSlice.reducer
