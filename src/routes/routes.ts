import { Router } from "express";
//USER CONTROLLER
import { getUsers, createUsers } from "../controllers/userController";
//TASK CONTROLLER
import { getTasks } from "../controllers/taskController";
import { createUserTask, getUserTasks } from "../controllers/userTaskController";

const router = Router();

/**
 * Users
 */
router.get("/users", getUsers);
router.post("/users", createUsers);

/**
 * Task
 */
router.get("/tasks", getTasks);

/**
 * Tareas de un usuario
 */
router.get("/user/:id/tasks", getUserTasks);
router.post("/user/:id/tasks", createUserTask);

export default router;
