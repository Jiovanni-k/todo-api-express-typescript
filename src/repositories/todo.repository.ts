
import { prisma } from "../config/prisma.js";

export const findAll= async ()=>{

    return await prisma.todos.findMany();
    
}

export const insert = async (  title : string )=>{
    return await prisma.todos.create({
        data: {
            title ,
            completed : false
        }
    })
}

export const findById = async ( id:number )=>{
    return await prisma.todos.findUnique({
        where : { id }
    })
}

export const update = async ( id:number, title:string, completed: boolean )=>{
    return await prisma.todos.update({
        where : {id : id},
        data :{
            title : title ,
            completed : completed
        }
    })
}

export const remove = async ( id : number )=>{
    await prisma.todos.delete({
        where : { id : id }
    });
    return true;
}