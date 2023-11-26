"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTask = exports.getUserTasks = void 0;
const db_1 = require("../db");
const taskService_1 = require("../services/taskService");
const CreateTaskRequest_1 = require("../request/CreateTaskRequest");
const taskServices = new taskService_1.TaskService();
function getUserTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id, 10);
        try {
            const user = yield db_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            const tasks = yield taskServices.getTasks(user);
            return res.json(tasks);
        }
        catch (error) {
            console.error("Error al obtener tareas:", error);
            return res.status(500).json({ error: "Error al obtener tareas" });
        }
    });
}
exports.getUserTasks = getUserTasks;
function createUserTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const missingFieldError = (0, CreateTaskRequest_1.CreateTaskRequest)(req.body);
        if (missingFieldError) {
            return res.status(400).json({ error: missingFieldError });
        }
        const userId = parseInt(req.params.id, 10);
        try {
            const newTask = req.body;
            const user = yield db_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            return res.json(yield taskServices.createTask(user, newTask));
        }
        catch (error) {
            console.error("Error al obtener tareas:", error);
            return res.status(500).json({ error: "Error al crear tareas" });
        }
    });
}
exports.createUserTask = createUserTask;
