import { Request, Response, response } from "express";
import { prisma } from "../db";
import { CreateUserRequest } from "../request/CreateUserRequest";
import { UserRepository } from "../repositories/userRepository";

//SERVICIOS O REPOSITORIOS
const userRepository = new UserRepository();

export async function getUsers(req: Request, res: Response) {
  res.json(await prisma.user.findMany());
}

export async function createUsers(req: Request, res: Response) {
  const missingFieldError = CreateUserRequest(req.body);
  if (missingFieldError) {
    return res.status(400).json({ error: missingFieldError });
  }
  try {
    const newUser = req.body;
    const createdUser = await userRepository.createUser(newUser)
    res.json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
}
