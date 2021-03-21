import mongoose, { Schema } from "mongoose"
import { ITask } from "../interfaces"

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    storyPoints: { type: Number },
    asignee: { type: String },

    bucket: { type: Schema.Types.ObjectId, ref: "Bucker", required: true },
  },
  { timestamps: true }
)

const TaskModel = mongoose.model<ITask>("Task", TaskSchema)

export default TaskModel
