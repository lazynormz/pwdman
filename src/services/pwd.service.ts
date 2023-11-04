import { Pool } from "mariadb"
import { PwdDTO } from "../DTO/pwd.dto"
import { IDatabaseResponse } from "../repo/db"
import { ValidatePwd } from "../util/pwd.util"
import { InsertPassword } from "../repo/password.repo"

const InsertPasswordService = async (pool: Pool, newPass: PwdDTO): Promise<IDatabaseResponse> => {
    let _res: IDatabaseResponse = {data:[],status:200}
    if(!ValidatePwd(newPass)){
        return {data:["Some of the fields where empty..."], status:400}
    }
    _res = await InsertPassword(pool, newPass)
    return _res
}

export {
    InsertPasswordService
}