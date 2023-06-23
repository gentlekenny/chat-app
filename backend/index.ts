import 'dotenv/config';
import express, { Express } from 'express';
//import { GenerateRoutes, appRouter } from './routes';
//import { DatabaseConnection } from '../core/database/connection';
import bodyParser from 'body-parser';
import { DatabaseConnection } from "./database/connection"
import { GenerateRoutes, appRouter } from './routes';

const app: Express = express()
const port = process.env.APP_PORT || 8000;

async function main() {
    try {
        const dbClient = await DatabaseConnection.getConnection()
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