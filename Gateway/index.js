const express = require('express');
const dotenv = require('dotenv');
const app = express();
const functions = require('./routes/routes');

dotenv.config();

app.use(express.json());

app.use('/', functions);

app.listen(process.env.PORT, () => {
    console.log('Server run on port: ', process.env.PORT);
});
