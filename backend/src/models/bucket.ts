import mongoose, { Schema } from "mongoose"
import { IBucket } from "../interfaces"

const BucketSchema = new Schema(
  {
    name: { type: String, required: true },
    index: { type: Number, required: true, unique: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
)

BucketSchema.pre("find", function () {
  this.populate("tasks")
}).pre("findById", function () {
  this.populate("tasks")
})

const BucketModel = mongoose.model<IBucket>("Bucket", BucketSchema)

export default BucketModel
