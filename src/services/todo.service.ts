import { db } from "../config/db.js";
import * as repository from "../repositories/todo.repository.js";

export const getAllTodos = async () => {

    const todo = await repository.findAll();
    return todo;
}

export const getTodoById = async ( id : number )=>{
    return await repository.findById(id);
}

export const createTodo = async ( title : string  )=>{

    if ( title === undefined ){
        throw new Error ("title is required.");
    }
    if ( title.trim()=== ""){
        throw new Error ("title should not be empty.");
    }
     
    return await repository.insert(title);
}

export const updateTodo = async ( id :number, title: string, completed:boolean)=>{

    if ( title === undefined || completed === undefined ){
       
        throw new Error ("title and completed are required.");
        }

        const exist = repository.findById(id);
        if ( !exist ){
            return null;
        }
        
        return await repository.update(id,title,completed);
    
}

export const deleteTodo = async ( id : number )=>{
    
    return await repository.remove(id);
}