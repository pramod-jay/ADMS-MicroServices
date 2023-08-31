const mongo = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();

const client = new mongo.MongoClient(process.env.MONGO_URI);

const connection = client.db('Inventory');

module.exports = connection;