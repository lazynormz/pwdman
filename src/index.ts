import 'dotenv/config'

import { GetAll, GetUserById } from './services/user.service';

import { IConnectionInformation, CreatePool } from './repo/db';
const pool = CreatePool({
    host: process.env.HOST!,
    data: process.env.DATABASE!,
    user: process.env.USER!,
    pass: process.env.PASS!,
    connectionLimit: 5
})

import express from 'express';
const app = express()

const port = 3000;

app.get("/", async (req,res)=>{
    let db_res = await GetAll(pool)
    res.send(db_res)
})

app.get("/:uuid", async (req,res)=>{
    let id = req.params.uuid
    console.log(id);
    
    let db_res = await GetUserById(pool, req.params.uuid)
    res.send(db_res)
})

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})