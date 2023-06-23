import "dotenv/config"
import { MongoClient } from "mongodb"


// Establishing only one client connection with Mongo database
// which is going to be distributed to all controllers

export const GetMongoClient = () => {
    const uri = process.env.DB || ""
    const mongoClient = new MongoClient(uri, {
        monitorCommands: true
    })
    checkConnection(mongoClient).then(isConnected => {
        return mongoClient
    })
}

// Method to check if connection is well established
async function checkConnection(client: MongoClient) {
    try {
        await client.connect();
        console.log("Connection established");
        return true
        // Perform database operations here
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        return false
    }
}