import { Document } from "mongoose"

export interface IBucket extends Document {
  name: string
  index: number
  tasks: ITask["_id"][]
}

export interface ITask extends Document {
  bucket: IBucket["_id"]
  title: string
  description?: string
  storyPoints?: string
  asignee?: string
}
