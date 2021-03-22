import { useState } from "react"
import {
  TextField,
  Dialog,
  DialogContent,
  Grid,
  Button,
  DialogActions,
  Autocomplete,
} from "@material-ui/core"
import { ITask } from "../interfaces"
import { useAppSelector } from "../redux/hooks"
import { selectStatus } from "../redux/penBoardSlice"

interface ITaskDialog {
  task: ITask
  open: boolean
  onClose: () => void
}

const storyPointOptions = ["1", "2", "3", "5", "8"]

export default function TaskDialog({ task, open, onClose }: ITaskDialog): JSX.Element {
  let initialStoryPoints: string
  if (task.storyPoints) {
    initialStoryPoints = task.storyPoints.toString()
  }

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [storyPoints, setStoryPoints] = useState(initialStoryPoints)
  const [asignee, setAsignee] = useState(task.asignee ?? "")

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
          <Button variant="outlined" color="secondary">
            Delete
          </Button>
          <Button variant="contained">Update</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
