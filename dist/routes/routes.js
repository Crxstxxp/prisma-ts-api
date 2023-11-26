"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//USER CONTROLLER
const userController_1 = require("../controllers/userController");
//TASK CONTROLLER
const taskController_1 = require("../controllers/taskController");
const userTaskController_1 = require("../controllers/userTaskController");
const router = (0, express_1.Router)();
/**
 * Users
 */
router.get("/users", userController_1.getUsers);
router.post("/users", userController_1.createUsers);
/**
 * Task
 */
router.get("/tasks", taskController_1.getTasks);
/**
 * Tareas de un usuario
 */
router.get("/user/:id/tasks", userTaskController_1.getUserTasks);
router.post("/user/:id/tasks", userTaskController_1.createUserTask);
exports.default = router;
