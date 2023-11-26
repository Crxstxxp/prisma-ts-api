import { Request, Response, response } from "express";
import { prisma } from "../db";
import { TaskService } from "../services/taskService";
import { CreateTaskRequest } from "../request/CreateTaskRequest";

const taskServices = new TaskService();

export async function getUserTasks(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const tasks = await taskServices.getTasks(user);
    return res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return res.status(500).json({ error: "Error al obtener tareas" });
  }
}

export async function createUserTask(req: Request, res: Response) {

  const missingFieldError = CreateTaskRequest(req.body);
  if (missingFieldError) {
    return res.status(400).json({ error: missingFieldError });
  }

  const userId = parseInt(req.params.id, 10);

  try {
    const newTask = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json(await taskServices.createTask(user, newTask));

  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return res.status(500).json({ error: "Error al crear tareas" });
  }
}
