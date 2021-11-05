import { Draggable } from "react-beautiful-dnd"
import { Paper, Skeleton, Typography } from "@mui/material"
import { ITask } from "../interfaces"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { selectStatus, setDialogTask } from "../redux/penBoardSlice"

interface ITaskCard {
  task: ITask
  index: number
}

export default function TaskCard({ task, index }: ITaskCard): JSX.Element {
  const penBoardStatus = useAppSelector(selectStatus)
  const appDispatch = useAppDispatch()
  function handleDialogOpen() {
    appDispatch(setDialogTask(task))
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
        </div>
      )}
    </Draggable>
  )
}
