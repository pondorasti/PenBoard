import { BucketModel } from "../models"
import { IBucket, ITask } from "../interfaces"

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

  static async updateTasks(id: string, tasks: ITask[]): Promise<{ [bucket: string]: IBucket }> {
    await BucketModel.findByIdAndUpdate(id, { tasks })
    const bucket = await BucketModel.findById(id)

    return { bucket }
  }
}
