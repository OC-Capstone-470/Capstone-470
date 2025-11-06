//from Github Actions documentation
const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

pgclient.connect();

const table = 'CREATE TABLE Profile(id SERIAL PRIMARY KEY, email VARCHAR(75) UNIQUE NOT NULL, FName VARCHAR(50), LName VARCHAR(50), role VARCHAR(12) NOT NULL, status VARCHAR(25), phone VARCHAR(12) NOT NULL)'
const text = 'INSERT INTO Profile(email, FName, LName, role, status, phone) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
const values = ['tofuspark@gmail.com', 'Alex', 'Anthony', 'admin', 'active', '12501234567']

pgclient.query(table, (err, res) => {
    if (err) throw err
});

pgclient.query(text, values, (err, res) => {
    if (err) throw err
});

pgclient.query('SELECT * FROM Profile', (err, res) => {
    if (err) throw err
    console.log(err, res.rows) // Print the data in student table
    pgclient.end()
});
