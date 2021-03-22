import { Draggable } from "react-beautiful-dnd"
import { Paper, Skeleton, Typography } from "@material-ui/core"
import { ITask } from "../interfaces"
import { useAppSelector } from "../redux/hooks"
import { selectStatus } from "../redux/penBoardSlice"

interface ITaskCard {
  task: ITask
  index: number
}

export default function TaskCard({ task, index }: ITaskCard): JSX.Element {
  const status = useAppSelector(selectStatus)

  return (
    <Draggable draggableId={task._id} index={index} isDragDisabled={status !== "succeeded"}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            margin: "0 0 8px 0",
            ...provided.draggableProps.style,
          }}
        >
          {status === "succeeded" ? (
            <Paper sx={{ padding: 2, minHeight: "48px" }}>
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
