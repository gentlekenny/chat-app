require('dotenv').config();

const { MongoClient, Collection } = require('mongodb');

class DatabaseConnection {
  static client;
  // Adding constructor
  constructor() {}

  // Adding connectToDatabaseMethod
  static async connectToDatabase() {
    const uri = process.env.DB;
    this.client = new MongoClient(uri, { monitorCommands: true });
    const collection = this.client.db('chatapp').collection('kolekcija');

    return this.client;
  }
}

exports.DatabaseConnection = DatabaseConnection;
