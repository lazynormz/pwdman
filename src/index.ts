import 'dotenv/config'

import { IConnectionInformation, CreatePool } from './db';
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

app.get("", (req,res)=>{
    res.send("Hello World")
})

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})