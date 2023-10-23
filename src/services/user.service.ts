import { UserDTO } from "../DTO/user.dto"
import { GetAllUsers, GetUserByID } from "../repo/user.repo"
import { Pool } from "mariadb"
import { SingularUserFromDb, UsersFromDb,  } from "../util/user.util"



const GetAll = async (pool: Pool): Promise<UserDTO[]> => {
    return await UsersFromDb(await GetAllUsers(pool, {elements: ["id", "username", "password"], table: "user"}))
}

const GetUserById = async (pool: Pool, uuid: string): Promise<UserDTO> => {
    let q = `SELECT * FROM \`user\` WHERE \`id\`="${uuid}"`
    return await SingularUserFromDb(await GetUserByID(pool, {query: q}))
}

export {
    //Methods
    GetAll,
    GetUserById
}