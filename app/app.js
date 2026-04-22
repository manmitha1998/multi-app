const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.log("DB connection failed");
  } else {
    console.log("Connected to DB");
  }
});

app.get('/', (req, res) => {
  res.send("Backend connected to DB successfully 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});