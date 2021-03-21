import mongoose, { Schema, Document } from "mongoose"
import { ITask } from "../interfaces"

const TaskSchema: Schema = new Schema(
  {
    bucket: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    storyPoints: { type: Number },
    asignee: { type: String },
  },
  { timestamps: true }
)

const Task = mongoose.model<ITask & Document>("Task", TaskSchema)

export default Task
