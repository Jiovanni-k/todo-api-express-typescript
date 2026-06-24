import { db } from "../config/db.js";

export const findAll= async ()=>{

    const result = await db.query(
            "SELECT * from todos "
        );

        return result.rows;
        
}