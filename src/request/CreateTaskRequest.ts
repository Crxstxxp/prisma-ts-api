export function CreateTaskRequest(data: any): string | null {
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
