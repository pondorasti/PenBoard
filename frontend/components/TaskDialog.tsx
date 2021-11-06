import { useState } from "react"
import { TextField, Dialog, DialogContent, Grid, DialogActions, Autocomplete } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { ITask } from "../interfaces"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import {
  selectSaveOrUpdateStatus,
  selectDeleteStatus,
  createTask,
  updateTask,
  deleteTask,
} from "../redux/penBoardSlice"

interface ITaskDialog {
  isNewTask: boolean
  task: ITask
  open: boolean
  onClose: () => void
}

const storyPointOptions = ["1", "2", "3", "5", "8"]

export default function TaskDialog({ isNewTask, task, open, onClose }: ITaskDialog): JSX.Element {
  const appDispatch = useAppDispatch()
  const saveOrUpdateStatus = useAppSelector(selectSaveOrUpdateStatus)
  const deleteStatus = useAppSelector(selectDeleteStatus)

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [storyPoints, setStoryPoints] = useState(task.storyPoints)
  const [asignee, setAsignee] = useState(task.asignee)

  function handleDeleteButton() {
    appDispatch(deleteTask(task._id))
  }

  function handleSaveOrUpdateButton() {
    let payload = {
      bucket: task.bucketId,
      title,
      description,
      storyPoints,
      asignee,
    }

    if (isNewTask) {
      appDispatch(createTask(payload))
    } else {
      appDispatch(updateTask({ taskId: task._id, payload }))
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Grid container spacing={2} direction="column" sx={{ paddingTop: 1 }}>
          <Grid item>
            <TextField
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              label="Title"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              label="Description"
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              value={storyPoints}
              onChange={(_, newValue) => setStoryPoints(newValue)}
              renderInput={(params) => <TextField {...params} label="Story Points" />}
              options={storyPointOptions}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              value={asignee}
              onChange={(event) => setAsignee(event.target.value)}
              label="Asignee"
              fullWidth
            />
          </Grid>
        </Grid>
        <DialogActions sx={{ paddingTop: 3 }}>
          {!isNewTask && (
            <LoadingButton
              variant="outlined"
              loading={deleteStatus !== "idle"}
              color="secondary"
              onClick={handleDeleteButton}
            >
              Delete
            </LoadingButton>
          )}
          <LoadingButton
            variant="contained"
            loading={saveOrUpdateStatus !== "idle"}
            onClick={handleSaveOrUpdateButton}
          >
            {isNewTask ? "Save" : "Update"}
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
