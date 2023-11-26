"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRequest = void 0;
function CreateUserRequest(data) {
    const requiredFields = ["name", "password"];
    for (const field of requiredFields) {
        if (!data[field]) {
            return `Campo ${field} es requerido`;
        }
        if ((field === "name" || field === "password") &&
            typeof data[field] !== "string") {
            return `Campo ${field} debe ser una cadena de texto`;
        }
    }
    return null;
}
exports.CreateUserRequest = CreateUserRequest;
