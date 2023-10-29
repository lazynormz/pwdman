import 'dotenv/config'

import { GetAllUsers, GetUserId } from './controllers/user.controller';
import { RegisterUser } from './controllers/account.controller';

import { CreatePool } from './repo/db';
const pool = CreatePool({
    host: process.env.HOST!,
    data: process.env.DATABASE!,
    user: process.env.USER!,
    pass: process.env.PASS!,
    connectionLimit: 5
})

import express from 'express';
const app = express()

app.use(express.json())

const port = 3000;

app.get("/", async (req, res) => {
    GetAllUsers(req, res, pool)
})

app.get("/:uuid", async (req, res) => {
    GetUserId(req, res, pool)
})

app.post("/reg/", async (req, res) => {
    RegisterUser(req,res,pool)
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})