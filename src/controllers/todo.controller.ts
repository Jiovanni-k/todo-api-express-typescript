import { Request , Response } from "express";
import * as service from "../services/todo.service.js";

export const getTodos =  async ( req: Request, res: Response ) => {

    try{
        const todo = await service.getAllTodos();
        res.status(200).json(todo);
    }
    catch( error ){
        res.status(500).json({
            message : "Error displaying todos."
        })
    }
    
}

export const createTodos = async ( req: Request, res: Response ) => {

    const { title }= req.body;
try {
    const todo = await service.createTodo(title);
        res.status(201).json(todo);
    }
    catch ( error ){
        res.status(500).json({
            message : "Error creating todo."
        })
    }
}

export const getTodoById =  async ( req: Request , res : Response ) => {
        const id = Number(req.params.id);
    try {
        const todo = await service.getTodoById(id);
        
        if ( !todo ){
           return res.status(404).json({
                message : "Todo Not Found :("
            });
        }
        res.status(200).json(todo);
    }
    catch( error ){
        res.status(500).json({
            message : "Error displaying todo."
        })
    }

    
}

export const updateTodo = async ( req : Request, res: Response ) => {

    const { title, completed } = req.body;
    const id = Number( req.params.id);

        try {
            const todo = await service.updateTodo(id, title, completed);
            
            if ( !todo ){
                return res.status(404).json({
                    message : "Todo Not Found :("
                });
            }

            res.status(200).json(todo);
        }
        catch ( error ){
            res.status(500).json({
                message : "Error Updating the todo."
            })
        }
  
}

export const deleteTodo = async ( req:Request, res:Response )=>{

    const id = Number (req.params.id);
    try {
        const todo = await service.deleteTodo(id);

        if ( todo === 0 ){
            return res.status(404).json({
                message : "Todo Not Found :("
            });
        }

        res.status(204).send();
    }
    catch ( error ){
        res.status(500).json({
            message : "Error Deleting the Todo."
        })
    }
}

