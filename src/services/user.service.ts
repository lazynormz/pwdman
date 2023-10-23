import { UserDTO } from "../DTO/user.dto"
import { GetAllUsers } from "../repo/db"
import { Pool } from "mariadb"
import { UserFromDb } from "../util/user.util"



const GetAll = async (pool: Pool): Promise<UserDTO> => {
    return await UserFromDb(await GetAllUsers(pool, {elements: ["id", "username", "password"], table: "user"}))
}

export {
    //Methods
    GetAll
}