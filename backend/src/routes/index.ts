import { Router } from "express"
import bucketRoutes from "./bucket"
import taskRoutes from "./task"

const router = Router()

router.use("/bucket", bucketRoutes)
router.use("/task", taskRoutes)

export default router
