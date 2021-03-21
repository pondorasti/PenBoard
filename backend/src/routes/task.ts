import { Router, Request, Response } from "express"
import { TaskService } from "../controllers"

const router = Router()

// Get all Tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAll()

    res.json(tasks)
  } catch (err) {
    res.json({ error: "of" })
  }
})

// Get Task by id
router.get("/:taskId", async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    const task = await TaskService.get(taskId)

    res.json(task)
  } catch (err) {
    res.json({ error: "of" })
  }
})

// Create new Task
router.post("/", async (req: Request, res: Response) => {
  try {
    const taskPayload = req.body
    const task = await TaskService.create(taskPayload)

    res.json(task)
  } catch (err) {
    res.json({ error: "of" })
  }
})

// Update Task by id
router.put("/:taskId", async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    const taskPayload = req.body
    const task = await TaskService.update(taskId, taskPayload)

    res.json(task)
  } catch (err) {
    res.json({ error: "of" })
  }
})

// Delete Task by id
router.delete("/:taskId", async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    const task = await TaskService.delete(taskId)

    res.json(task)
  } catch (err) {
    res.json({ error: "of" })
  }
})

export default router
