import { Request, Response, Router } from "express"

const router = Router()

// Get all Tasks
router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Retrieving all tasks" })
})

// Get Task by id
router.get("/:taskId", async (req: Request, res: Response) => {
  const { taskId } = req.params
  res.json({ message: `Retrieving task with id: ${taskId}` })
})

// Create new Task
router.post("/", async (req: Request, res: Response) => {
  res.json({ message: "Creating new task" })
})

// Update Task by id
router.put("/:taskId", async (req: Request, res: Response) => {
  const { taskId } = req.params
  res.json({ message: `Updating task with id: ${taskId}` })
})

// Delete Task by id
router.delete("/:taskId", async (req: Request, res: Response) => {
  const { taskId } = req.params
  res.json({ message: `Updating task with id: ${taskId}` })
})

export default router
