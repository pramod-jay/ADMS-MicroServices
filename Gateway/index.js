const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
// const functions = require('./routes/routes');
const proxy = require('express-http-proxy');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/user', proxy('http://localhost:8001')); //User endpoint
app.use('/order', proxy('http://localhost:8002'));
app.use('/inventory', proxy('http://localhost:8003'));

// app.use('/', functions);

app.listen(process.env.PORT, () => {
    console.log('Server run on port: ', process.env.PORT);
});
