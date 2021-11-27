import express, { Request, Response } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import mongoose from "mongoose"
import router from "./routes"
import BucketService from "./controllers/bucket"

// Setup
dotenv.config()
const app = express()
const port = process.env.BACKEND_DOCKER_PORT || 8001 // Database Setup

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())

// Database config
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const mongoUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

// TODO: add await
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database.")
  })
  .catch((err) => {
    console.log("Connection to MongoDB unsuccesful.")
    console.log(err)
  })

// Routes
app.use(router)
app.get("/", (req: Request, res: Response) => {
  res.send("API is working, go to /bucket or /task")
})

// Start Server
app.listen(port, async () => {
  try {
    const response = await BucketService.getAll()
    if (response.buckets.length === 0) {
      await BucketService.create({ name: "Todo", index: 0 } as any)
      await BucketService.create({ name: "In Progress", index: 1 } as any)
      await BucketService.create({ name: "In Review", index: 2 } as any)
      await BucketService.create({ name: "Done", index: 3 } as any)
    }
  } catch (error) {
    console.log(error)
  }

  console.log(`Server is listening on ${port}`)
})

export default app
