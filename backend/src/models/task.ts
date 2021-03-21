import mongoose, { Schema } from "mongoose"
import { ITask } from "../interfaces"
import BucketModel from "./bucket"

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

TaskSchema.pre<ITask>("save", async function (next) {
  const bucket = await BucketModel.findById(this.bucket)
  bucket.tasks.unshift(this)
  await bucket.save()

  next()
})

TaskSchema.pre<ITask>("deleteOne", { document: true, query: false }, async function (next) {
  const bucket = await BucketModel.findById(this.bucket)
  const taskIndex = bucket.tasks.indexOf(this._id)
  if (taskIndex > -1) {
    bucket.tasks.splice(taskIndex, 1)
  }
  await bucket.save()

  next()
})

const TaskModel = mongoose.model<ITask>("Task", TaskSchema)

export default TaskModel
