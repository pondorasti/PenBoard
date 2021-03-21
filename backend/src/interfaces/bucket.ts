import { Document } from "mongoose"

export default interface IBucket extends Document {
  name: string
  index: number
}
