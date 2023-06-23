import "dotenv/config"
import { Db, MongoClient } from "mongodb"


// Creating static class for establishing DB connection
export class DatabaseConnection {
    private static connection: Db

    private constructor() { }

    public static async getConnection() {
        if (!DatabaseConnection.connection) {
            const uri = process.env.DB || ""
            try {
                DatabaseConnection.connection = new MongoClient(uri, {
                    monitorCommands: true
                }).db("chatapp")
                console.log("Connection established");
                // Perform database operations here
            } catch (error) {
                console.error("Failed to connect to MongoDB:", error);
            }
        }
        return DatabaseConnection.connection
    }

}