const express = require('express');
const router = express.Router();

const test = require('./../functions/Test/test');

router.get('/testGateway', (req, res) => {
    test(req, res);
});

module.exports = router;