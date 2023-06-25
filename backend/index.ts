import 'dotenv/config';
import express, { Express } from 'express';
//import { GenerateRoutes, appRouter } from './routes';
//import { DatabaseConnection } from '../core/database/connection';
import bodyParser from 'body-parser';
import { DatabaseConnection } from "./database/connection"
import { GenerateRoutes, appRouter } from './routes';
import { RedisClient } from './redis/client';
import { Request } from "express"
import { Server } from 'socket.io';
import http from "http"
import cors from "cors"


const app: Express = express()
const port = process.env.APP_PORT || 8000;


async function main() {
    try {
        const dbClient = await DatabaseConnection.getConnection()
        const redisClient = await RedisClient.getClient()
        GenerateRoutes(dbClient)
        app.use(cors<Request>())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(appRouter)
        const server = http.createServer(app)
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
        io.on("connection", (socket) => {
            // send a message to the client
            socket.broadcast.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
            console.log("Hello")
        });

        io.on("/message", (socket) => {
            socket.broadcast.emit("Hahahah, bravo")

        })
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
}

main();

