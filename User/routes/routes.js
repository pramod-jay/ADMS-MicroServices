const express = require('express');
const router = express.Router();

const test = require('./../functions/Test/test');
const user_service = require('./../functions/User_Service/user_service');

//Test function
router.get('/testUser', (req, res) => {
    test(req, res);
});

router.post('/user_service',(req,res)=>{
    user_service(req,res);
});


module.exports = router;