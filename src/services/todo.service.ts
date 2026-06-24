import { db } from "../config/db.js";

export const getAllTodos = async () => {

    const result = await db.query(
            "SELECT * from todos "
        );

        return result.rows;
}

export const getTodoById = async ( id : number )=>{
    const result = await db.query(
            "SELECT * from todos WHERE id =$1",[id]
        );

        return result.rows[0];
}

export const createTodo = async ( title : string  )=>{
    const result = await db.query(
        "INSERT INTO todos (title , completed) VALUES ($1,$2) RETURNING *", [title,false] );
        return result.rows[0];
}

export const updateTodo = async ( id :number, title: string, completed:boolean)=>{

    if ( title === undefined || completed === undefined ){
        return undefined;
        
        }
    const result = await db.query (
                "UPDATE todos SET title = $1, completed =$2 WHERE id =$3 RETURNING *", [title,completed,id]
            );
            return result.rows[0];
}

export const deleteTodo = async ( id : number )=>{
    const result = await db.query(
            "DELETE  from todos WHERE id =$1", [id]
        );
        return result.rowCount;
}