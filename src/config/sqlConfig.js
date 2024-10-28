const mysql = require('mysql2');
require(dotnev).config();

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: "",
    database: process.env.DATABASE
});

module.exports = db;