const express = require('express');
const mysql = require('mysql2');

const app = express();

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root123',
    database: 'testdb'
};

let db;

function connectDB() {
    db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.log("❌ DB not ready, retrying...");
            setTimeout(connectDB, 5000);
        } else {
            console.log("✅ Connected to MySQL");
        }
    });
}

connectDB();

// API
app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.send(err);
        res.json(results);
    });
});

// Root
app.get('/', (req, res) => {
    res.send("Backend connected to DB!");
});

app.listen(3000, '0.0.0.0', () => {
    console.log("Backend running on port 3000");
});