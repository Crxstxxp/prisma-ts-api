import { prisma } from "../db";

export class TaskRepository {

  async create(taskData: any): Promise<any> {
    return await prisma.task.create({
      data: taskData
    })
  }
  
}
