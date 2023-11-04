import 'dotenv/config'

import { GetAllUsers, GetUserId } from './controllers/user.controller';
import { RegisterUser } from './controllers/account.controller';
import { Route } from './shared/interfaces';
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

// Create and all the routes for our application
const ROUTES: Route[] = [
    { method: 'GET', route: "/", callback: GetAllUsers },
    { method: 'GET', route: "/:uuid", callback: GetUserId },
    { method: 'POST', route: "/reg/", callback: RegisterUser }
]

// Map all of our routes to the express application
ROUTES.forEach(r => {
    switch (r.method) {
        case 'GET':
            app.get(r.route, async (req, res) => { r.callback(req, res, pool) })
        case 'POST':
            app.post(r.route, async (req, res) => { r.callback(req, res, pool) })
        case 'PUT':
        case 'DELETE':
        case 'UPDATE':
        default:
            break
    }
})

// Start the server and listens for requests
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})