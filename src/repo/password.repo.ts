import { Pool } from "mariadb"
import { PwdDTO } from "../DTO/pwd.dto"
import { IDatabaseResponse } from "./db"

const InsertPassword = async (pool: Pool, newPass: PwdDTO): Promise<IDatabaseResponse> => {
    let res: IDatabaseResponse = {
        data: undefined,
        status: undefined
    }

    let conn

    try {
        conn = await pool.getConnection()

        const db_res = await conn.query(`INSERT INTO pwd (userID, password, source) VALUES ("${newPass.OwnerID}","${newPass.pwd}","${newPass.source}")`)
        res.status = 200
        res.data = db_res
    }catch(err){
        res.data = undefined
        res.status = err
    }finally{
        if(conn) conn.end()
        return res
    }
}

const GetPassword = () => {

}

export {
    InsertPassword,
    GetPassword,
}