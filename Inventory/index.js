const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const functions = require('./routes/routes');

const app = express();
app.use(express.json());

app.use('/', functions);

app.listen(process.env.PORT, () => {
    console.log('Server run on port: ', process.env.PORT);
})