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
     
    return await repository.insert(title);
}

export const updateTodo = async ( id :number, title: string, completed:boolean)=>{

    if ( title === undefined || completed === undefined ){
        return undefined;

        }
        return await repository.update(id,title,completed);
    
}

export const deleteTodo = async ( id : number )=>{
    
    return await repository.remove(id);
}