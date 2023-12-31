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
exports.createUsers = exports.getUsers = void 0;
const db_1 = require("../db");
const CreateUserRequest_1 = require("../request/CreateUserRequest");
const userRepository_1 = require("../repositories/userRepository");
//SERVICIOS O REPOSITORIOS
const userRepository = new userRepository_1.UserRepository();
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield db_1.prisma.user.findMany());
    });
}
exports.getUsers = getUsers;
function createUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const missingFieldError = (0, CreateUserRequest_1.CreateUserRequest)(req.body);
        if (missingFieldError) {
            return res.status(400).json({ error: missingFieldError });
        }
        try {
            const newUser = req.body;
            const createdUser = yield userRepository.createUser(newUser);
            res.json(createdUser);
        }
        catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Error creating user" });
        }
    });
}
exports.createUsers = createUsers;
