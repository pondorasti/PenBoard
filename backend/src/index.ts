import express, { Request, Response } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
// import router from "./routes"

// Setup
dotenv.config()
const app = express()
const port = process.env.PORT || 8000 // Database Setup

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())

// Routes
// app.use(router)
app.get("/", (req: Request, res: Response) => {
  res.send("API is working")
})

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})

export default app
