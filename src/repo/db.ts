import mariadb from 'mariadb'

const CreatePool = (opt: IConnectionInformation): mariadb.Pool => {
    return mariadb.createPool({host: opt.host, database: opt.data,user: opt.user, password: opt.pass, connectionLimit: opt.connectionLimit})
}

const GetAllUsers = async (pool: mariadb.Pool, opt: IDatabaseOptions): Promise<IDatabaseResponse> => {

    let res: IDatabaseResponse = {
        data: undefined, status:"OK"
    }

    let conn
    try {
        //Establish connection
        conn = await pool.getConnection()

        //Format all the things we want to select
        let select_elements = opt.elements.map(x=>{return "\`" + x + "\`"})

        //Fetch data
        const rows: string[] = await conn.query(`SELECT ${select_elements} FROM ${opt.table}`)
        
        //Set data in our response to what we got
        res.data = rows;
    }catch(err){ //If an error happens...
        res.data = undefined;   //Set data to undefined (null, void, nothing)...
        res.status = err        //and set status to the error message

    } finally {                 //At the end of it all...
        if (conn) conn.end()    //Close the connection if it's up and...
        return res;             //Send data back up the chain
    }
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

export {
    //Methods
    CreatePool,
    GetAllUsers,
    
    //Interfaces
    IConnectionInformation,
    IDatabaseResponse,
    IDatabaseOptions,
}