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

interface UpdateTaskProps {
  taskId: string
  payload: any
}
export const updateTask = createAsyncThunk(
  `${name}/updateTask`,
  async ({ taskId, payload }: UpdateTaskProps) => {
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
  const response = await fetch(`${taskRef}/${taskId}`, {
    method: "DELETE",
  })
  const data = await response.json()

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
    removeDialog(state) {
      state.showDialog = false
    },
  },
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
      state.showDialog = false
      state.needRefresh = true
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.saveOrUpdateStatus = "failed"
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
    builder.addCase(updateTask.rejected, (state, action) => {
      state.saveOrUpdateStatus = "failed"
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
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.deleteStatus = "failed"
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
export const { setDialogTask, removeDialog } = penBoardSlice.actions

// Slice Reducer
export default penBoardSlice.reducer
