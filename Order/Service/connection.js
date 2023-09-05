const dotenv = require("dotenv");
// Function to connect to the database
const {Client} = require("pg");

    dotenv.config();

    const client = new Client({
        user: process.env.POSTGRE_USER,
        host: process.env.POSTGRE_HOST,
        database: process.env.POSTGRE_DB,
        password: process.env.POSTGRE_PW, // Remove the space at the beginning of the password
        port: process.env.POSTGRE_PORT,
        ssl: {
            // SSL configuration for a secure connection (Azure requires this)
            rejectUnauthorized: false, // Set to false to avoid certificate validation
        },
    });

    client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
    })
    .catch((error) => {
        console.error('Error connecting to PostgreSQL:', error);
        throw error;
    });

module.exports = client;
