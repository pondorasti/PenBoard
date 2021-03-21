import { Router, Request, Response } from "express"
import { BucketService } from "../controllers"

const router = Router()

// Get all Buckets
router.get("/", async (req: Request, res: Response) => {
  try {
    const buckets = await BucketService.getAll()

    res.json(buckets)
  } catch (err) {
    res.json({ error: "of" })
  }
})

// Create new Bucket
router.post("/", async (req: Request, res: Response) => {
  try {
    const bucketPayload = req.body
    const bucket = await BucketService.create(bucketPayload)

    res.json(bucket)
  } catch (err) {
    res.json({ error: "of" })
  }
})

export default router
