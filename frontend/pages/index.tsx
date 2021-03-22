import { useState } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import AddRoundedIcon from "@material-ui/icons/AddRounded"
import { Box, IconButton, Paper, Typography } from "@material-ui/core"
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd"
import { useAppSelector } from "./redux/hooks"
import { selectBuckets } from "./redux/penBoardSlice"
import TaskCard from "./components/TaskCard"

export default function Home() {
  const mockColumns = useAppSelector(selectBuckets)

  const [columns, setColumns] = useState(mockColumns)

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
          items: copiedItems,
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

  function cardsFactory(column) {
    return column.tasks.map((task, index) => {
      return <TaskCard key={task._id} task={task} index={index} />
    })
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
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} style={{ margin: 8 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  paddingBottom="8px"
                  marginBottom="8px"
                  borderBottom="1px solid rgb(48, 50, 54)"
                >
                  <Typography variant="h6">{column.name}</Typography>
                  <IconButton size="small" color="primary" aria-label="plus icon">
                    <AddRoundedIcon />
                  </IconButton>
                </Box>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        width: 240,
                        minHeight: 80,
                      }}
                    >
                      {cardsFactory(column)}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
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
