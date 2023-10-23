import { Pool } from "mariadb"
import { IDatabaseOptions, IDatabaseQuery, IDatabaseResponse } from "./db"
import { UserDTO } from "../DTO/user.dto"

const GetAllUsers = async (pool: Pool, opt: IDatabaseOptions): Promise<IDatabaseResponse> => {

    let res: IDatabaseResponse = {
        data: undefined, status:"OK"
    }

    let conn
    try {
        //Establish connection
        conn = await pool.getConnection()

        //Format all the things we want to select
        let select_elements = opt.elements.map(x=>{return "\`" + x + "\`"})

        //Fetch data
        const rows: string[] = await conn.query(`SELECT ${select_elements} FROM ${opt.table}`)
        
        //Set data in our response to what we got
        res.data = rows;
    }catch(err){ //If an error happens...
        res.data = undefined;   //Set data to undefined (null, void, nothing)...
        res.status = err        //and set status to the error message

    } finally {                 //At the end of it all...
        if (conn) conn.end()    //Close the connection if it's up and...
        return res;             //Send data back up the chain
    }
}

const GetUserByID = async (pool: Pool, query: IDatabaseQuery): Promise<IDatabaseResponse> => {

    let res: IDatabaseResponse = {
        data: undefined, status:"OK"
    }

    let conn
    try {
        //Establish connection
        conn = await pool.getConnection()

        let rows: string[] = []

        //Fetch data
        if(query.table){
           rows = await conn.query(`SELECT ${query.query} FROM ${query.table}`)
        }else {
           rows = await conn.query(query.query)
        }
        
        //Set data in our response to what we got
        res.data = rows;
    }catch(err){ //If an error happens...
        res.data = undefined;   //Set data to undefined (null, void, nothing)...
        res.status = err        //and set status to the error message

    } finally {                 //At the end of it all...
        if (conn) conn.end()    //Close the connection if it's up and...
        return res;             //Send data back up the chain
    }
}

const RegisterUser = async (pool: Pool, new_user: UserDTO): Promise<IDatabaseResponse> => {

    let res: IDatabaseResponse = {data:[],status:"OK"}

    let conn

    try {
        conn = await pool.getConnection()

        const db_res = await conn.query(`INSERT INTO user (username, password) VALUES ("${new_user.username}", "${new_user.password}")`)

        console.log(res);

        res.data = db_res
        
    }catch(err){
        res.data = undefined
        res.status = err
    }finally{
        if (conn) conn.end()
        return res
    }
}

export {
    GetAllUsers,
    GetUserByID,
    RegisterUser,
}