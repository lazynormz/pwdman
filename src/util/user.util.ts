import { UserDTO } from "../DTO/user.dto";
import { IDatabaseResponse } from "../repo/db";

const UserFromDb = async (db_ent: IDatabaseResponse): Promise<UserDTO> => {
    if (db_ent.status !== "OK"){
        return {UUID: ""}
    }
    let d = db_ent.data as string[]

    let res: UserDTO = d[0] as unknown as UserDTO
    
    return res
}

export {UserFromDb}