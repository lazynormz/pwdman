import { Request, Response } from "express"
import { Pool } from "mariadb"

type routeInterface = "GET" | "POST" | "PUT" | "DELETE" | "UPDATE" 

interface Route {
    method: routeInterface,
    route: string,
    callback(req: Request, res: Response, pool: Pool): void,
    auth?: boolean
}

export {
    Route
}