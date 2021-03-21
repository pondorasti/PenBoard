import mongoose, { Schema } from "mongoose"
import { IBucket } from "../interfaces"

const BucketSchema = new Schema(
  {
    name: { type: String, required: true },
    index: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
)

const BucketModel = mongoose.model<IBucket>("Bucket", BucketSchema)

export default BucketModel
