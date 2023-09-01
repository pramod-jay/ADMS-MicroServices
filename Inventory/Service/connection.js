const mongo = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();
    var connection;

    try {
        const client = new mongo.MongoClient(process.env.MONGO_URI);
        connection = client.db('Inventory');  
        console.log("Connected to Inventory database.");
    } catch (error) {
        console.log(error);
    };

module.exports = connection;