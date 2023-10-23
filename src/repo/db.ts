import mariadb from 'mariadb'

const CreatePool = (opt: IConnectionInformation): mariadb.Pool => {
    return mariadb.createPool({host: opt.host, database: opt.data,user: opt.user, password: opt.pass, connectionLimit: opt.connectionLimit})
}

const Get = (pool: mariadb.Pool): IDatabaseResponse => {
    return {data: undefined, status: ""}
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
    status: string
}

export {
    //Methods
    CreatePool,
    
    //Interfaces
    IConnectionInformation
}