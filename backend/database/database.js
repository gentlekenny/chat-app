require('dotenv').config();

const { MongoClient } = require('mongodb');

class DatabaseConnection {
  static connection;
  // Adding constructor
  constructor() {}

  // Adding connectToDatabaseMethod
  static async connectToDatabase() {
    const uri = process.env.DB;
    const client = new MongoClient(uri);

    if (!DatabaseConnection.connection) {
      try {
        // Connect to the MongoDB cluster
        DatabaseConnection.connection = await client.connect();
      } catch (e) {
        console.error(e);
      }
    }
    return this.connection;
  }
}

exports.DatabaseConnection = DatabaseConnection;
