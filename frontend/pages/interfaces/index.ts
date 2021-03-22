export interface IBucket {
  _id: string
  name: string
  index: number
  tasks: ITask[]
}

export interface ITask {
  _id: string
  bucketId: string
  title: string
  description?: string
  storyPoints?: string
  asignee?: string
}

export type Status = "idle" | "pending" | "succeeded" | "failed"
