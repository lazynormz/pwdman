import { Request, Response } from "express";
import { Pool } from "mariadb";
import { UserDTO } from "../DTO/user.dto";
import { IDatabaseErrorInterface, IDatabaseResponse } from "../repo/db";
import { RegisterNewUser } from "../services/user.service";

const RegisterUser = async (req: Request, res: Response, pool: Pool) => {
    console.log(req.body);

    const new_user_info: UserDTO = { username: req.body.username, password: req.body.password }
    let db_res: IDatabaseResponse = await RegisterNewUser(pool, new_user_info)
    if (db_res.status !== 200) {
        let _err: IDatabaseErrorInterface = db_res.status as IDatabaseErrorInterface
        res.status(404).send(`${_err["sqlMessage"]}`)
    } else {
        res.send("User successfully created...")
    }
}

export {
    RegisterUser,
}