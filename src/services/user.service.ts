import { UserDTO } from "../DTO/user.dto"
import { GetAllUsers, GetUserByID, RegisterUser } from "../repo/user.repo"
import { Pool } from "mariadb"
import { SingularUserFromDb, UsersFromDb,  } from "../util/user.util"



const GetAll = async (pool: Pool): Promise<UserDTO[]> => {
    return await UsersFromDb(await GetAllUsers(pool, {elements: ["id", "username", "password"], table: "user"}))
}

const GetUserById = async (pool: Pool, uuid: string): Promise<UserDTO> => {
    let q = `SELECT * FROM \`user\` WHERE \`id\`="${uuid}"`
    return await SingularUserFromDb(await GetUserByID(pool, {query: q}))
}

const RegisterNewUser = async (pool:Pool, user_info: UserDTO): Promise<IServiceValidation | undefined> => {
    if(user_info.username === undefined || user_info.username === null || user_info.username === "" || user_info.password === undefined ||user_info.password === null ||user_info.password === "") {
        return {error: "Either the password or username field are empty..."}
    }
    await RegisterUser(pool, user_info)
    return undefined
}

interface IServiceValidation {
    error: string
}

export {
    //Methods
    GetAll,
    GetUserById,
    RegisterNewUser
}