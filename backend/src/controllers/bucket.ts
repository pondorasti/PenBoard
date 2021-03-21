import { BucketModel } from "../models"
import { IBucket } from "../interfaces"

export default class BucketService {
  static async getAll(): Promise<{ [buckets: string]: IBucket[] }> {
    const buckets = await BucketModel.find({})

    return { buckets }
  }

  static async create(bucketPayload: IBucket): Promise<{ [bucket: string]: IBucket }> {
    const newBucket = new BucketModel(bucketPayload)
    const savedBucket = await newBucket.save()

    return { bucket: savedBucket }
  }
}
