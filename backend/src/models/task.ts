import mongoose, { Document, Schema } from "mongoose"

interface ITask extends Document {
  bucket: string
  title: string
  description?: string
  storyPoints?: number
  asignee?: string
}

const TaskSchema: Schema = new Schema({
  bucket: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  storyPoints: { type: Number },
  asignee: { type: String },
})

const Task = mongoose.model<ITask>("Task", TaskSchema)

export default Task
