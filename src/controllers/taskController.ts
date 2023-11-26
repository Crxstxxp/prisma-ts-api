import { Request, Response, response } from "express";
import { prisma } from "../db";

export async function getTasks(req: Request, res: Response) {
  return res.json(await prisma.task.findMany())
}
