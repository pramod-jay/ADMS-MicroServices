const express = require('express');
const router = express.Router();

const test = require('./../functions/Test/test');
const addOrder = require('./../functions/operations/addOrder');
const deleteOrder = require('./../functions/operations/deleteOrder');
const listOrder = require('./../functions/operations/listOrder');
const updateOrder = require('./../functions/operations/updateOrder');
const listOrderByUser = require('./../functions/userFunc/listOrderByUser');
const listOrderByInventory = require('./../functions/inventoryFunc/listOrderByInventory');

router.get('/testOrder', (req, res) => {
    test(req, res);
});

router.post('/order', (req, res) => {
    addOrder(req, res);
});

router.delete('/order', (req, res) => {
   deleteOrder(req, res);
});

router.get('/order', (req, res) => {
    listOrder(req, res);
});

router.put('/order', (req, res) => {
   updateOrder(req, res);
});

router.get('/orderByUser', (req, res) => {
    listOrderByUser(req, res);
});

router.get('/orderByInventory', (req, res) => {
    listOrderByInventory(req, res);
});
module.exports = router;
