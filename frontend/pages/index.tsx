import { useState, useEffect } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { Box } from "@material-ui/core"
import { DragDropContext, resetServerContext } from "react-beautiful-dnd"
import { useAppSelector, useAppDispatch } from "./redux/hooks"
import { fetchBuckets, selectBuckets } from "./redux/penBoardSlice"
import BucketColumn from "./components/BucketColumn"

export default function Home() {
  const mockColumns = useAppSelector(selectBuckets)
  const [columns, setColumns] = useState(mockColumns)

  const appDispatch = useAppDispatch()
  useEffect(() => {
    appDispatch(fetchBuckets())
  }, [])

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

      // Update
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      })
    } else {
      // Moving card to different column
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.tasks]
      const destItems = [...destColumn.tasks]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)

      // Update
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      })
    }
  }

  return (
    <div>
      <Head>
        <title>PenBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box display="flex" justifyContent="Center" height="100%">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([bucketKey, bucket]) => (
              <BucketColumn key={bucket._id} bucket={bucket} />
            ))}
          </DragDropContext>
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
