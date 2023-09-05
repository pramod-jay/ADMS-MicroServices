// const mongo = require('mongodb');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME});

const connection = mongoose.connection;

connection.on('error', (error) => {
    console.log('Error connecting to the Database');
});

connection.once('open', () => {
    console.log('Connected to Inventory database');
})

    

module.exports = connection;