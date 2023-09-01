const express = require('express');
const router = express.Router();

const test = require('./../functions/Test/test');
const create_user = require('./../functions/operations/create_user');
const view_user = require('./../functions/operations/view_user');
const update_user = require('./../functions/operations/update_user');
const delete_user = require('./../functions/operations/delete_user');


//Test function
router.get('/testUser', (req, res) => {
    test(req, res);
});

//.........Create User...............
router.post('/create_user',(req,res)=>{
    create_user(req,res);
});

//.........Update User...............
router.post('/update_user',(req,res)=>{
    update_user(req,res);
});

//.........Delete User...............
router.post('/delete_user',(req,res)=>{
    delete_user(req,res);
});

//.........Delete User...............
router.post('/view_user',(req,res)=>{
    view_user(req,res);
});

module.exports = router;