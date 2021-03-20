import { useState } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import AddRoundedIcon from "@material-ui/icons/AddRounded"
import { Box, IconButton, Paper, Typography } from "@material-ui/core"
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd"

export default function Home() {
  const mockItemsToDo = [
    { id: "1", title: "First task" },
    { id: "2", title: "Second task" },
  ]

  const mockItemsDone = [
    { id: "3", title: "Third task" },
    { id: "4", title: "Forth task" },
  ]

  const mockColumns = {
    ["3"]: {
      name: "ToDo",
      items: mockItemsToDo,
    },
    ["4"]: {
      name: "Done",
      items: mockItemsDone,
    },
  }

  const [columns, setColumns] = useState(mockColumns)

  function onDragEnd(result) {
    const { source, destination } = result

    // Do nothing if dragged outside
    if (!destination) return

    if (source.droppableId === destination.droppableId) {
      // Moving card within the same column
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
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
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)

      // Update
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    }
  }

  function cardsFactory(column) {
    return column.items.map((item, index) => {
      return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => {
            return (
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
                  <Typography variant="subtitle2">{item.title}</Typography>
                </Paper>
              </div>
            )
          }}
        </Draggable>
      )
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
