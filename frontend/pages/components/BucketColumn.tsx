import { Box, IconButton, Typography } from "@material-ui/core"
import AddRoundedIcon from "@material-ui/icons/AddRounded"
import { Droppable } from "react-beautiful-dnd"
import TaskCard from "./TaskCard"
import { IBucket } from "../interfaces"

interface IBucketColumn {
  bucket: IBucket
}

export default function BucketColumn({ bucket }: IBucketColumn) {
  function cardsFactory(column) {
    return column.tasks.map((task, index) => {
      return <TaskCard key={task._id} task={task} index={index} />
    })
  }

  return (
    <div style={{ margin: 8 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        paddingBottom="8px"
        marginBottom="8px"
        borderBottom="1px solid rgb(48, 50, 54)"
      >
        <Typography variant="h6">{bucket.name}</Typography>
        <IconButton size="small" color="primary" aria-label="plus icon">
          <AddRoundedIcon />
        </IconButton>
      </Box>
      <Droppable droppableId={bucket.index.toString()} key={bucket.index}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              width: 240,
              minHeight: 80,
            }}
          >
            {cardsFactory(bucket)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
