import 'dotenv/config'

import { GetAll, GetUserById, RegisterNewUser } from './services/user.service';

import { CreatePool, IDatabaseErrorInterface, IDatabaseResponse } from './repo/db';
const pool = CreatePool({
    host: process.env.HOST!,
    data: process.env.DATABASE!,
    user: process.env.USER!,
    pass: process.env.PASS!,
    connectionLimit: 5
})

import express from 'express';
import { UserDTO } from './DTO/user.dto';
const app = express()

app.use(express.json())

const port = 3000;

app.get("/", async (req,res)=>{
    let db_res = await GetAll(pool)
    res.send(db_res)
})

app.get("/:uuid", async (req,res)=>{
    let db_res = await GetUserById(pool, req.params.uuid)
    res.send(db_res)
})

app.post("/reg/", async (req,res)=>{
    console.log(req.body);
    
    const new_user_info: UserDTO = {username: req.body.username, password: req.body.password}
    let db_res:IDatabaseResponse = await RegisterNewUser(pool, new_user_info)
    if(db_res.status !== 200){
        let _err: IDatabaseErrorInterface = db_res.status as IDatabaseErrorInterface
        res.status(404).send(`${_err["sqlMessage"]}`)
    }else{
        res.send("User successfully created...")
    }
})
 
app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})