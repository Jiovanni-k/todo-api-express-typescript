import { Request , Response } from "express";
import { todos } from "../data/todo.js";

export const getTodos = ( req: Request, res: Response ) => {
    res.json( todos );
}

export const createTodos = ( req: Request, res: Response ) => {
    const newTodo = {
        id:todos.length+1,
        title: req.body.title,
        completed :false 
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
}

