const express = require('express');
const router = express.Router();

const test = require('./../functions/Test/test');

//Test function
router.get('/testUser', (req, res) => {
    test(req, res);
});


module.exports = router;