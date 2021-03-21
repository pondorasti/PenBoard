import { Document } from "mongoose"
import IBucket from "./bucket"

export default interface ITask extends Document {
  bucket: IBucket["_id"]
  title: string
  description?: string
  storyPoints?: number
  asignee?: string
}
