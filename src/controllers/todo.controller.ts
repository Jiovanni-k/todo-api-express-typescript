import { Request , Response } from "express";
import { todos } from "../data/todo.js"; // will remove this after i finish all the endpoints
import { db } from "../config/db.js";

export const getTodos = ( req: Request, res: Response ) => {
    res.json( todos );
}

export const createTodos = async ( req: Request, res: Response ) => {

    const { title } = req.body;
try {
    const result = await db.query(
        "INSERT INTO todos (title , completed) VALUES ($1,$2) RETURNING *", [title,false] );
        // the $1, $2 are only placeholders, because SQL does not see the Javascript variables
        res.status(201).json(result.rows[0]);
        //because database does not return a clean object, it returns a result wrapper and i choose what part is the 
        // response, and the RETURNING * returns the inserted rows as an array, and since i only insert one at a time 
        // so i always return the row at index 0.
    }
    catch ( error ){
        res.status(500).json({
            message : "Error creating todo."
        })
    }



}

export const getTodoById = ( req: Request , res : Response ) => {
    const id = Number ( req . params . id );
    const todo = todos.find( td => td.id === id );
    if( !todo) {
        res.status(404).json({
            message : "Todo Not Found :( "
        });
    }

    res.status(200).json(todo);
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

