import { TaskModel } from "../models"
import { ITask } from "../interfaces"

export default class TaskService {
  static async getAll(): Promise<{ [tasks: string]: ITask[] }> {
    const tasks = await TaskModel.find({})
    return { tasks }
  }

  static async get(id: string): Promise<{ [task: string]: ITask }> {
    const task = await TaskModel.findById(id)
    return { task }
  }

  static async create(taskPayload: ITask): Promise<{ [task: string]: ITask }> {
    const newTask = new TaskModel(taskPayload)
    const savedTask = await newTask.save()

    return { task: savedTask }
  }

  static async update(id: string, taskPayload: ITask): Promise<{ [task: string]: ITask }> {
    await TaskModel.findByIdAndUpdate(id, taskPayload)
    const task = await TaskModel.findById(id)

    return { task }
  }

  static async delete(id: string): Promise<{ [task: string]: ITask }> {
    const task = await TaskModel.findByIdAndDelete(id)

    return { task }
  }
}
