import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { Paper, Skeleton, Typography } from "@material-ui/core"
import TaskDialog from "./TaskDialog"
import { ITask } from "../interfaces"
import { useAppSelector } from "../redux/hooks"
import { selectStatus } from "../redux/penBoardSlice"

interface ITaskCard {
  task: ITask
  index: number
}

export default function TaskCard({ task, index }: ITaskCard): JSX.Element {
  const penBoardStatus = useAppSelector(selectStatus)
  const [dialogState, setDialogState] = useState(false)

  function handleDialogOpen() {
    setDialogState(true)
  }

  function handleDialogClose() {
    setDialogState(false)
  }

  return (
    <Draggable draggableId={task._id} index={index} isDragDisabled={penBoardStatus !== "succeeded"}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            cursor: "pointer",
            userSelect: "none",
            margin: "0 0 8px 0",
            ...provided.draggableProps.style,
          }}
        >
          {penBoardStatus === "succeeded" ? (
            <Paper sx={{ padding: 2, minHeight: "48px" }} onClick={handleDialogOpen}>
              <Typography variant="subtitle2">{task.title}</Typography>
            </Paper>
          ) : (
            <Skeleton width="100%" height="53px" sx={{ transform: "scale(1)" }} />
          )}

          <TaskDialog task={task} open={dialogState} onClose={handleDialogClose} />
        </div>
      )}
    </Draggable>
  )
}
