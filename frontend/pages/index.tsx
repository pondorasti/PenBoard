import { useState } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { Box } from "@material-ui/core"
import TaskDialog from "./components/TaskDialog"
import { DragDropContext, resetServerContext } from "react-beautiful-dnd"
import { useAppSelector, useAppDispatch } from "./redux/hooks"
import {
  fetchBuckets,
  selectBuckets,
  selectNeedsRefresh,
  selectShowDialog,
  selectDialogTask,
  removeDialog,
  updateBucketTasks,
  asyncUpdateBucketTasks,
} from "./redux/penBoardSlice"
import BucketColumn from "./components/BucketColumn"

export default function Home() {
  const appDispatch = useAppDispatch()
  const penBoardNeedsRefresh = useAppSelector(selectNeedsRefresh)

  const [mountDialog, setMountDialog] = useState(false)
  const showDialog = useAppSelector(selectShowDialog)
  const dialogTask = useAppSelector(selectDialogTask)

  if (showDialog && !mountDialog) {
    setMountDialog(true)
  } else if (!showDialog && mountDialog) {
    setMountDialog(false)
  }

  function handleDialogClose() {
    appDispatch(removeDialog())
  }
  const columns = useAppSelector(selectBuckets)

  if (penBoardNeedsRefresh) {
    appDispatch(fetchBuckets())
  }

  function onDragEnd(result) {
    const { source, destination } = result

    // Do nothing if dragged outside
    if (!destination) return

    if (source.droppableId === destination.droppableId) {
      // Moving card within the same column
      const column = columns[source.droppableId]
      const copiedItems = [...column.tasks]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)

      appDispatch(asyncUpdateBucketTasks({ bucketId: column._id, tasks: copiedItems }))
      appDispatch(updateBucketTasks(source.droppableId, copiedItems))
    } else {
      // Moving card to different column
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.tasks]
      const destItems = [...destColumn.tasks]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)

      appDispatch(asyncUpdateBucketTasks({ bucketId: sourceColumn._id, tasks: sourceItems }))
      appDispatch(updateBucketTasks(source.droppableId, sourceItems))

      appDispatch(asyncUpdateBucketTasks({ bucketId: destColumn._id, tasks: destItems }))
      appDispatch(updateBucketTasks(destination.droppableId, destItems))
    }
  }

  return (
    <div>
      <Head>
        <title>PenBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box display="flex" justifyContent="center" height="100%" padding={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([bucketKey, bucket]) => (
              <BucketColumn key={bucket._id} bucket={bucket} />
            ))}
          </DragDropContext>
          {mountDialog && (
            <TaskDialog
              isNewTask={dialogTask._id === ""}
              task={dialogTask}
              open={showDialog}
              onClose={handleDialogClose}
            />
          )}
        </Box>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Source: https://stackoverflow.com/a/64242579/7897036
  resetServerContext()

  return { props: { data: [] } }
}
