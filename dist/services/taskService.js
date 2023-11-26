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
exports.TaskService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const taskRepository_1 = require("../repositories/taskRepository");
const db_1 = require("../db");
class TaskService {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
        this.taskRepository = new taskRepository_1.TaskRepository();
    }
    getTasks(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = user.id
                    ? yield db_1.prisma.user.findUnique({
                        where: {
                            id: user.id,
                        },
                    })
                    : user;
                if (User.type == userRepository_1.UserRepository.ADMIN) {
                    return this.getAllTasks();
                }
                else {
                    return this.getTasksByUser(User);
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al obtener tareas");
            }
        });
    }
    getTasksByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = user.id
                    ? yield db_1.prisma.user.findUnique({
                        where: {
                            id: user.id,
                        },
                        include: {
                            task: true,
                        },
                    })
                    : user;
                return User.task;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al obtener tareas");
            }
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield db_1.prisma.task.findMany();
            return tasks;
        });
    }
    createTask(user, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const User = user.id
                ? yield db_1.prisma.user.findUnique({
                    where: {
                        id: user.id,
                    },
                })
                : user;
            if (User.type == userRepository_1.UserRepository.ADMIN) {
                throw new Error("Los usuarios de tipo administrador no pueden crear tareas");
            }
            return this.taskRepository.create(Object.assign(Object.assign({}, taskData), { userId: User.id }));
        });
    }
}
exports.TaskService = TaskService;
