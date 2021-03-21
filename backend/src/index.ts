import express, { Request, Response } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import mongoose from "mongoose"
import router from "./routes"

// Setup
dotenv.config()
const app = express()
const port = process.env.PORT || 8000 // Database Setup

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())

// Database config
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/penboard"
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
    throw err
  })

// Routes
app.use(router)
app.get("/", (req: Request, res: Response) => {
  res.send("API is working, go to /bucket or /task")
})

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})

export default app
