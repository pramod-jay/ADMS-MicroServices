const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

var connection = mysql.createConnection({
    host: process.env.DBHost,
    user: process.env.DBUname,
    password: process.env.DBPassword,
    database: process.env.DataBase,
    port: process.env.DBport
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected to User database")
});

module.exports = connection;

