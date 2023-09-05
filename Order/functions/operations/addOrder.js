const connection = require('./../../Service/connection');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function addOrder(req, res) {
    // Define a route to add a new order (POST request to add an order)
    const { order_id, order_qty, order_time, order_date, userId, inventoryId } = req.body; // Extract data from the request body

    if (!order_id || !order_qty || !order_time || !order_date) {
        res.status(400).json({ error: 'Missing required data' });
        return;
    }

    if (order_qty.length != inventoryId.length) return res.json('Item and quantity mismatched');

    //Check user and inventory exist or not
    const user = await userExist();
    if (!user) return res.json('User does not exist');

    const itemPrice = [];

    for(const ID of inventoryId){
        const inventory = await inventoryExist(ID);
        if (!inventory) return res.json('Inventory does not exist');
        itemPrice.push(inventory.itemPrice);
    }
    
    try {
        for (let i = 0; i < order_qty.length; i++) {
            console.log(order_qty[i]);
            console.log(inventoryId[i]);

            const query = 'INSERT INTO "order" (order_id, order_qty, order_time, order_date, user_id, item_id, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

            const values = [order_id, order_qty[i], order_time, order_date, user.userID, inventoryId[i],  itemPrice[i]*order_qty[i]];

            const result = await connection.query(query, values);

            console.log(result.rows);
        }
        return res.json('Order has been created successfully');
    } catch (error) {
        console.log(error)
        return res.json('Something went wrong: ' + error.detail);
    }

    //Check whether inventory exist or not by calling inventory server
    async function inventoryExist() {
        const inventory = await axios.get(process.env.INVENTORY_SERVER, { params: { itemId: inventoryId } });
        if (inventory.data.itemId) return inventory.data;
        return false;
    }

    //Check whether user exist or not by calling user server
    async function userExist() {
        const user = await axios.get(process.env.USER_SERVER, { params: { userID: userId } });
        if (user.data.userID) return user.data;
        return false;
    }
}
