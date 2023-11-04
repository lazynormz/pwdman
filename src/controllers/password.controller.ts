import { Request, Response } from "express"
import { Pool } from "mariadb"
import { IDatabaseResponse } from "../repo/db"

const RegisterNewPassword = async (req: Request, res: Response, pool: Pool) => {
}

export {
    RegisterNewPassword
}