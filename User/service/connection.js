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
    console.log("Connected to User database.")
});

module.exports = connection


// var mysql = require('mysql');

// var connection=mysql.createConnection({
//     host:"user-server.mysql.database.azure.com", 
//     user:"VikingsAdmin", 
//     password:"VAB20@1234", 
//     database:"user", 
//     port:3306, 
//     // ssl:{ca:fs.readFileSync("{ca-cert filename}")}
// });

// connection.connect(function (err) {
//     if(err) throw err;
//     console.log("connected to User database");
// });

// module.exports = connection

