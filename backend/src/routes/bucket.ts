import { Router, Request, Response } from "express"
import { BucketService } from "../controllers"

const router = Router()

// Get all Buckets
router.get("/", async (req: Request, res: Response) => {
  try {
    const buckets = await BucketService.getAll()

    res.json(buckets)
  } catch (err) {
    res.json({ error: err })
  }
})

// Create new Bucket
router.post("/", async (req: Request, res: Response) => {
  try {
    const bucketPayload = req.body
    const bucket = await BucketService.create(bucketPayload)

    res.json(bucket)
  } catch (err) {
    res.json({ error: err })
  }
})

// Update tasks in Bucket by id
router.put("/:bucketId", async (req: Request, res: Response) => {
  try {
    const { bucketId } = req.params
    const tasks = req.body
    const bucket = await BucketService.updateTasks(bucketId, tasks)

    res.json(bucket)
  } catch (err) {
    res.json({ error: err })
  }
})

export default router
