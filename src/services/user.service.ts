import { UserDTO } from "../DTO/user.dto"
import { GetAllUsers, GetUserByID, RegisterUser } from "../repo/user.repo"
import { Pool } from "mariadb"
import { SingularUserFromDb, UsersFromDb,  } from "../util/user.util"
import { IDatabaseResponse } from "../repo/db"



const GetAll = async (pool: Pool): Promise<UserDTO[]> => {
    return await UsersFromDb(await GetAllUsers(pool, {elements: ["id", "username", "password"], table: "user"}))
}

const GetUserById = async (pool: Pool, uuid: string): Promise<UserDTO> => {
    let q = `SELECT * FROM \`user\` WHERE \`id\`="${uuid}"`
    return await SingularUserFromDb(await GetUserByID(pool, {query: q}))
}

const RegisterNewUser = async (pool:Pool, user_info: UserDTO): Promise<IDatabaseResponse> => {
    let _res: IDatabaseResponse = {data:[], status:200}
    if(user_info.username === undefined || user_info.username === null || user_info.username === "" || user_info.password === undefined ||user_info.password === null ||user_info.password === "") {
        return {data:["Either the password or username field are empty..."], status:400}
    }
    _res = await RegisterUser(pool, user_info)
    return _res
}

export {
    //Methods
    GetAll,
    GetUserById,
    RegisterNewUser
}