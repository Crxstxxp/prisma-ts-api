"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskRequest = void 0;
function CreateTaskRequest(data) {
    const requiredFields = ["description"];
    for (const field of requiredFields) {
        if (!data[field]) {
            return `Campo ${field} es requerido`;
        }
        if (field === "description" && typeof data[field] !== "string") {
            return `Campo ${field} debe ser una cadena de texto`;
        }
    }
    return null;
}
exports.CreateTaskRequest = CreateTaskRequest;
