import mariadb from 'mariadb'

const CreatePool = (opt: IConnectionInformation): mariadb.Pool => {
    return mariadb.createPool({host: opt.host, database: opt.data,user: opt.user, password: opt.pass, connectionLimit: opt.connectionLimit})
}

interface IConnectionInformation {
    host: string,
    data: string,
    user: string,
    pass: string,
    connectionLimit: number
}

interface IDatabaseErrorInterface {
    name: string,
    sqlMessage: string,
    sql: string,
    fatal: boolean,
    errno: number,
    sqlSatate: string,
    code: string
}

interface IDatabaseResponse {
    data: string[] | string |undefined,
    status: number | unknown | IDatabaseErrorInterface
}

interface IDatabaseOptions {
    elements: string[]
    table: string,
}

interface IDatabaseQuery {
    table?: string,
    query: string
}

export {
    //Methods
    CreatePool,
    
    //Interfaces
    IConnectionInformation,
    IDatabaseResponse,
    IDatabaseOptions,
    IDatabaseQuery,
    IDatabaseErrorInterface 
}