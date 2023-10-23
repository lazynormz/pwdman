import { UserDTO } from "../DTO/user.dto";
import { IDatabaseResponse } from "../repo/db";

const UsersFromDb = async (db_ent: IDatabaseResponse): Promise<UserDTO[]> => {
    if (db_ent.status !== "OK"){
        return []
    }
    let d = db_ent.data as string[]

    let res: UserDTO[] = []// = d[0] as unknown as UserDTO
    
    for(let i = 0; i < d.length; i++){
        res.push(d[i] as unknown as UserDTO)
    }

    return res
}


const SingularUserFromDb = async (db_ent: IDatabaseResponse): Promise<UserDTO> => {
    if (db_ent.status !== "OK"){
        return {UUID:""}
    }
    let d = db_ent.data as string[]

    let res: UserDTO = d[0] as unknown as UserDTO
    
    return res
}



export {UsersFromDb, SingularUserFromDb}