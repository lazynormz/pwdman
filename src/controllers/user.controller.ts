import { Request, Response } from "express";
import { GetAll, GetUserById } from "../services/user.service";
import { Pool } from "mariadb";

const GetAllUsers = async (req: Request, res: Response, pool: Pool) => {
    let db_res = await GetAll(pool)
    res.send(db_res)
}

const GetUserId = async (req: Request, res: Response, pool: Pool) => {
    let db_res = await GetUserById(pool, req.params.uuid)
    res.send(db_res)
}

export {
    GetAllUsers,
    GetUserId,
}