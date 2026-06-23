import express from "express";
import { getTodos, createTodos, getTodoById, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = express.Router();
router.get("/", getTodos);
router.post("/", createTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;