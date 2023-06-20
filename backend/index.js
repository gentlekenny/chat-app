const express = require('express');
const { DatabaseConnection } = require('./database/database');
const app = express();
const port = process.env.PORT;

async function main() {
  try {
    DatabaseConnection.connectToDatabase();
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Application running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();
