const express = require('express');
const router = express.Router();

const test = require('./../functions/Test/test');
const addInventory = require('./../functions/Operations/addInventory');
const deleteInventory = require('./../functions/Operations/deleteInventory');
const listInventory = require('./../functions/Operations/listInventory');
const updateInventory = require('./../functions/Operations/updateInventory');


router.get('/testInventory', (req, res) => {
    test(req, res);
});

router.post('/inventory', (req, res) => {
    addInventory(req, res);
});

router.delete('/inventory', (req, res) => {
    deleteInventory(req, res);
});

router.get('/inventory', (req, res) => {
    listInventory(req, res);
});

router.put('/inventory', (req, res) => {
    updateInventory(req, res);
});

module.exports = router;