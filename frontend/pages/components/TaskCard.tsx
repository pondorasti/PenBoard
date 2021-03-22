import { Draggable } from "react-beautiful-dnd"
import { Paper, Typography } from "@material-ui/core"
import { ITask } from "../interfaces"

interface ITaskCard {
  task: ITask
  index: number
}

export default function TaskCard({ task, index }: ITaskCard): JSX.Element {
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
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
          <Paper sx={{ padding: 2, minHeight: "48px" }}>
            <Typography variant="subtitle2">{task.title}</Typography>
          </Paper>
        </div>
      )}
    </Draggable>
  )
}
