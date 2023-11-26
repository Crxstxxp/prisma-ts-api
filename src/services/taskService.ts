import { UserRepository } from "../repositories/userRepository";
import { TaskRepository } from "../repositories/taskRepository";
import { prisma } from "../db";

export class TaskService {
  private userRepository: UserRepository;
  private taskRepository: TaskRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.taskRepository = new TaskRepository();
  }

  async getTasks(user: any): Promise<any> {
    try {
      const User = await this.recoverUser(user);

      if (User.type == UserRepository.ADMIN) {
        return this.getAllTasks();
      } else {
        return this.getTasksByUser(User);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener tareas");
    }
  }

  async getTasksByUser(user: any): Promise<any> {
    try {
      const User = user.id
        ? await prisma.user.findUnique({
            where: {
              id: user.id,
            },
            include: {
              task: true,
            },
          })
        : user;

      return User.task;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener tareas");
    }
  }

  async getAllTasks(): Promise<any> {
    const tasks = await prisma.task.findMany();
    return tasks;
  }

  async createTask(user: any, taskData: any): Promise<any> {
    const User = await this.recoverUser(user);

    if (User.type == UserRepository.ADMIN) {
      throw new Error(
        "Los usuarios de tipo administrador no pueden crear tareas"
      );
    }

    return this.taskRepository.create({
      ...taskData,
      userId: User.id,
    });
  }

  async recoverUser(user: any): Promise<any> {
    return user.id
      ? await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        })
      : user;
  }
}
