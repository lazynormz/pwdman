import { Request, Response } from "express"
import { Pool } from "mariadb"
import { IDatabaseErrorInterface, IDatabaseResponse } from "../repo/db"
import { PwdDTO } from "../DTO/pwd.dto"
import { InsertPasswordService } from "../services/pwd.service"

const RegisterPassword = async (req: Request, res: Response, pool: Pool) => {
    const _pass: PwdDTO = { OwnerID: req.body.uuid, pwd: req.body.pass, source: req.body.source }
    let db_res: IDatabaseResponse = await InsertPasswordService(pool, _pass)
    if (db_res.status != 200) {
        let _err: IDatabaseErrorInterface = db_res.status as IDatabaseErrorInterface
        if(_err["sqlMessage"] === undefined){
            res.status(db_res.status as number).send(`Error: ${db_res.data}`)
        }else {
            res.status(400).send(`Error: ${_err["sqlMessage"]} || ${db_res.data}`)
        }
    }else{
        res.send("Password successfully registered...")
    }
}

export {
    RegisterPassword
}