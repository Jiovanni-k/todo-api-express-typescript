import { Request , Response } from "express";
import { todos } from "../data/todo.js"; // will remove this after i finish all the endpoints
import { db } from "../config/db.js";

export const getTodos =  async ( req: Request, res: Response ) => {

    try{
        const result = await db.query(
            "SELECT * from todos "
        );
        res.status(200).json(result.rows);// because result contains meta data + actual data

    }
    catch( error ){
        res.status(500).json({
            message : "Error displaying todos."
        })
    }
    
}

export const createTodos = async ( req: Request, res: Response ) => {

    const { title } = req.body;
try {
    const result = await db.query(
        "INSERT INTO todos (title , completed) VALUES ($1,$2) RETURNING *", [title,false] );
        // the $1, $2 are only placeholders, because SQL does not see the Javascript variables
        res.status(201).json(result.rows[0]);
        //because database does not return the inserted object directly, it returns a result wrapper and i choose what part is the 
        // response, and the RETURNING * returns the rows affected by the query as an array, and since i only insert one at a time 
        // so i always return the row at index 0.
    }
    catch ( error ){
        res.status(500).json({
            message : "Error creating todo."
        })
    }
}

export const getTodoById =  async ( req: Request , res : Response ) => {

    try {
        const id = Number(req.params.id);
        const result = await db.query(
            "SELECT * from todos WHERE id=$1", [id]
        );
        
        if ( result.rows.length === 0 ){
            res.status(404).json({
                message : "Todo Not Found :("
            });
        }
        res.status(200).json(result.rows);
    }
    catch( error ){
        res.status(500).json({
            message : "Error displaying todo."
        })
    }

    
}

export const updateTodo = async ( req : Request, res: Response ) => {

    const { title, completed } = req.body;

    if ( title === undefined || completed === undefined ){
        res.status(400).json({
            message : "title and completed are required."});
        }

        try {
            const id = Number( req.params.id);
            const result = await db.query (
                "UPDATE todos SET title = $1, completed =$2 WHERE id =$3 RETURNING*", [title,completed,id]
            );
            
            if ( result.rows.length === 0){
                res.status(404).json({
                    message : "Todo Not Found :("
                });
            }

            res.status(200).json(result.rows[0]);
        }
        catch ( error ){
            res.status(500).json({
                message : "Error Updating the todo."
            })
        }
  
}

export const deleteTodo = async ( req:Request, res:Response )=>{


    try {

        const id = Number(req.params.id);
        const result = await db.query(
            "DELETE  from todos WHERE id =$1", [id]
        );

        if ( result.rowCount === 0 ){
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

