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

export const updateTodo = ( req : Request, res: Response ) => {
    const todo = todos.find( td => td.id === Number(req.params.id));
    if ( !todo ){
        res.status(404).json({
            message : "Todo Not Found :( "
        });
    }
    else if ( todo ){
        todo.title = req.body.title ?? todo.title ;
        todo.completed = req.body.completed ?? todo.completed ;
    }

    res.json(todo);
}

export const deleteTodo = ( req : Request , res : Response )=> {
    const id = Number ( req.params.id);
    const index = todos.findIndex( td => td.id === id);

    if (index >= 0){
        todos.splice(index,1);
        res.status(204).send();
    }
    else if ( index === -1 ){
    res.status(404).json({
        message : "Todo Not Found :("
    });
   }
    //findIndex does not return a boolean so using a true or false scenario is wrong
    //it returns a the number of the index and if the index does not exist it returns -1
    /* else if (!index ){
        res.status(404).json(
            {
                message : "Todo Not Found :( "
            }
        );
    } */
   
}

