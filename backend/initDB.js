const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

const dbName = process.env.DB_DATABASE;

connection.connect(error => {
    if (error) {
        console.error("An error occurred while connecting to the database.");
        throw error;
    }
    console.log("Successfully connected to the MySQL server.");

    // Create database if not exists
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, result) => {
        if (err) throw err;
        console.log("Database created");

        // Connect to the database
        connection.changeUser({ database: dbName }, (err) => {
            if (err) throw err;
            console.log("Database selected");

            // Create table if not exists
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS tutorials (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    published BOOLEAN NOT NULL DEFAULT false
                )
            `;
            connection.query(createTableQuery, (err, result) => {
                if (err) throw err;
                console.log("Table tutorials created");
                connection.end();
            });
        });
    });
});
