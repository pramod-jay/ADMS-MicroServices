//***This function belongs to create new order***

const connection = require('./../../Service/connection');
const axios = require('axios');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

module.exports = async function addOrder(req, res) {
    const { order_id, order_qty, userId, inventoryId } = req.body; 

    if (!order_id || !order_qty || !userId || !inventoryId) {
        res.status(400).json({ error: 'Missing required data' });
        return;
    }

    //Check item and quantity arrays's lenths are equal 
    if (order_qty.length != inventoryId.length) return res.json('Item and quantity mismatched');

    //Check user exist or not
    const user = await userExist();
    if (!user) return res.json('User does not exist');

    const itemPrice = [];
    const itemName = [];
    const quantityAvailable = [];

    let index = 0;

    //Check each item's existancy and availabilily in the inventory
    for (const ID of inventoryId) {
        const inventory = await inventoryExist(ID);
        if (!inventory) return res.json('Inventory does not exist');

        if (inventory.quantityAvailable < order_qty[index]) return res.json('Item ' + inventory.itemId + ' availablity is ' + inventory.quantityAvailable);
        index++;

        itemPrice.push(inventory.itemPrice);
        itemName.push(inventory.itemName);
        quantityAvailable.push(inventory.quantityAvailable);

    }

    //Get current date and time
    const date = moment().format('YYYY-MM-DD');
    const time = moment().format('YYYY-MM-DD hh:mm:ss');

    try {

        //Insert item one by one to the relevant order
        for (let i = 0; i < order_qty.length; i++) {

            const query = 'INSERT INTO "order" (order_id, order_qty, order_time, order_date, user_id, item_id, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

            const values = [order_id, order_qty[i], time, date, user.userID, inventoryId[i], itemPrice[i] * order_qty[i]];

            const result = await connection.query(query, values);

            //Reduce quantity of relevant item in inventory 
            await updateQuantity(inventoryId[i], itemName[i], itemPrice[i], (quantityAvailable[i] - order_qty[i])); 

            console.log('Affected rows: ',result.rowCount);
        }
        return res.json('Order has been created successfully');
    } catch (error) {
        console.log(error)
        return res.json('Something went wrong: ' + error.detail);
    }

    //Check whether inventory exist or not by calling inventory server
    async function inventoryExist(ID) {
        const inventory = await axios.get(process.env.INVENTORY_SERVER, { params: { itemId: ID } });
        if (inventory.data.itemId) return inventory.data;
        return false;
    }

    //Check whether user exist or not by calling user server
    async function userExist() {
        const user = await axios.get(process.env.USER_SERVER, { params: { userID: userId } });
        if (user.data.userID) return user.data;
        return false;
    }

    //Update quantity availabaility of relevent inventory when order placed
    async function updateQuantity(itemID, itemName, itemPrice, updateQuantity) {
        await axios.put(process.env.INVENTORY_SERVER, { itemId: itemID, itemName: itemName, itemPrice: itemPrice, quantityAvailable: updateQuantity });
        return;
    }
}