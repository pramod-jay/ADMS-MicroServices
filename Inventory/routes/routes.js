const express = require('express');
const router = express.Router();

const test = require('./../functions/Test/test');

router.get('/testInventory', (req, res) => {
    test(req, res);
});



module.exports = router;