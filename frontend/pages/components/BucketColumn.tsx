import { useState } from "react"
import { Box, IconButton, Typography } from "@material-ui/core"
import AddRoundedIcon from "@material-ui/icons/AddRounded"
import { Droppable } from "react-beautiful-dnd"
import TaskCard from "./TaskCard"
import TaskDialog from "./TaskDialog"
import { IBucket, ITask } from "../interfaces"
import { fetchBuckets, selectNeedsRefresh } from "../redux/penBoardSlice"
import { useAppSelector, useAppDispatch } from "../redux/hooks"

interface IBucketColumn {
  bucket: IBucket
}

export default function BucketColumn({ bucket }: IBucketColumn) {
  const appDispatch = useAppDispatch()
  const penBoardNeedsRefresh = useAppSelector(selectNeedsRefresh)

  const taskTemplate: ITask = { _id: "", title: "", bucketId: bucket._id }
  const [isActive, setIsActive] = useState(false)
  const [dialogState, setDialogState] = useState(false)
  function handleDialogClose() {
    setDialogState(false)
  }
  function handleButton() {
    setDialogState(true)
  }

  function cardsFactory(column) {
    return column.tasks.map((task, index) => {
      return <TaskCard key={task._id} task={task} index={index} />
    })
  }

  if (penBoardNeedsRefresh && dialogState) {
    handleDialogClose()
    setIsActive(true)
  } else if (penBoardNeedsRefresh && !dialogState && isActive) {
    appDispatch(fetchBuckets())
  } else if (isActive) {
    setIsActive(false)
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
        <IconButton size="small" color="primary" aria-label="plus icon" onClick={handleButton}>
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
      <TaskDialog isNewTask task={taskTemplate} open={dialogState} onClose={handleDialogClose} />
    </div>
  )
}
