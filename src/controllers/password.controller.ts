import { Request, Response } from "express"
import { Pool } from "mariadb"
import { IDatabaseErrorInterface, IDatabaseResponse } from "../repo/db"
import { PwdDTO } from "../DTO/pwd.dto"
import { InsertPasswordService } from "../services/pwd.service"

const RegisterNewPassword = async (req: Request, res: Response, pool: Pool) => {
    const _pass: PwdDTO = { OwnerID: req.body.uuid, pwd: req.body.pass, source: req.body.source }
    let db_res: IDatabaseResponse = await InsertPasswordService(pool, _pass)
    if (db_res.status != 200) {
        let _err: IDatabaseErrorInterface = db_res.status as IDatabaseErrorInterface
        res.status(404).send(`${_err["sqlMessage"]}`)
    }else{
        res.send("Password successfully registered...")
    }
}

export {
    RegisterNewPassword
}