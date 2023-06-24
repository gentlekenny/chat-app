import 'dotenv/config';
import express, { Express } from 'express';
//import { GenerateRoutes, appRouter } from './routes';
//import { DatabaseConnection } from '../core/database/connection';
import bodyParser from 'body-parser';
import { DatabaseConnection } from "./database/connection"
import { GenerateRoutes, appRouter } from './routes';
import { RedisClient } from './redis/client';


const app: Express = express()
const port = process.env.APP_PORT || 8000;

async function main() {
    try {
        const dbClient = await DatabaseConnection.getConnection()
        const redclient = await RedisClient.getClient()
        GenerateRoutes(dbClient)
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(appRouter)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
}

main();
function reject(error: any) {
    throw new Error('Function not implemented.');
}

