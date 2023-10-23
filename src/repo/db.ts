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

interface IDatabaseResponse {
    data: string[] | undefined,
    status: string | unknown 
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
}