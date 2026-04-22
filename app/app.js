const express = require('express');
const mysql = require('mysql2');

const app = express();

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root123',
    database: 'testdb'
};

function connectDB() {
    const connection = mysql.createConnection(dbConfig);

    connection.connect(err => {
        if (err) {
            console.log("❌ DB not ready, retrying in 5 sec...");
            setTimeout(connectDB, 5000);
        } else {
            console.log("✅ Connected to MySQL");
        }
    });
}

connectDB();

app.get('/', (req, res) => {
    res.send('Backend connected to DB!');
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Backend running on port 3000');
});