//***This function belongs to update order***

const connection = require('./../../Service/connection');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = async function updateOrder(req, res) {
    const { order_id, ordered_item_id, new_item_id, quantity } = req.body;

    if (!order_id || !ordered_item_id || !new_item_id || !quantity) {
        return res.json('Missing required data');
    }

    try {

        //Check whether order available in the orderDB
        const orderAvailabilityQuery = 'SELECT * FROM "order" WHERE order_id = $1';
        const orderAvailability = await connection.query(orderAvailabilityQuery, [order_id]);
        if (orderAvailability.rowCount == 0) return res.json('Order does not exist');

        //Check whether new item available in the inventory
        const new_item = await inventoryExist(new_item_id);
        if (!new_item) return res.json('New item does not exist');

        //Check whether ordered item valid one or not
        const ordered_item = await inventoryExist(ordered_item_id);
        if (!ordered_item) return res.json('Ordered item ID invalid');

        //Check ordered item is in the relevant order
        const checkOrderQuery = 'SELECT * FROM "order" WHERE order_id = $1 AND item_id = $2';
        const order = await connection.query(checkOrderQuery, [order_id, ordered_item_id]);
        if (order.rowCount == 0) return res.json('Item ' + ordered_item_id + ' not in order ' + order_id);

        //Check new item is already in the relevant order
        const newItemStatus = await connection.query(checkOrderQuery, [order_id, new_item_id]);
        if (newItemStatus.rowCount != 0) {
            if (ordered_item_id === new_item_id) { //If same item's quanity update
                if (quantity < (newItemStatus.rows[0].order_qty)) { //If new quantity less than ordered quantity

                    //Update extra quantity of relevant item in inventory
                    //Update order with new quantity
                    await updateQuantity(new_item_id, new_item.itemName, new_item.itemPrice, (Number(ordered_item.quantityAvailable) + Number(newItemStatus.rows[0].order_qty) - quantity));
                    const query = 'UPDATE "order" SET order_qty = $1, item_id = $2, total = $3 WHERE order_id = $4 AND item_id = $5 RETURNING *';
                    const values = [quantity, new_item_id, (quantity * new_item.itemPrice), order_id, ordered_item_id];
                    const result = await connection.query(query, values);
                    console.log('Affected rows: ', result.rowCount);

                    return res.json('Order has been successfully updated');

                } else if (quantity > (newItemStatus.rows[0].order_qty)) { //If new quantity greater than oredered quantity

                    //Check new quantity available in the store (Previous ordered quantity + quantity in inventory)
                    if (new_item.quantityAvailable < (quantity - (newItemStatus.rows[0].order_qty))) return res.json('Item ' + new_item_id + ' availablity is ' + (Number(new_item.quantityAvailable) + Number(newItemStatus.rows[0].order_qty)));

                    //Insufficient items are reduced from inventory
                    //Update order with new quantity
                    await updateQuantity(new_item_id, new_item.itemName, new_item.itemPrice, (new_item.quantityAvailable - (quantity - newItemStatus.rows[0].order_qty)));
                    const query = 'UPDATE "order" SET order_qty = $1, item_id = $2, total = $3 WHERE order_id = $4 AND item_id = $5 RETURNING *';
                    const values = [quantity, new_item_id, (quantity * new_item.itemPrice), order_id, ordered_item_id];
                    const result = await connection.query(query, values);
                    console.log('Affected rows: ', result.rowCount);

                    return res.json('Order has been successfully updated');

                } else {
                    //If new quantity and ordered quantity equal
                    return res.json('There is nothing to update');
                }
            } else {
                return res.json('Item ' + new_item_id + ' already included in order ' + order_id);
            }
        }

        //If relevant item change to another one with new quantity

        //Check quantity availability of new item
        if (new_item.quantityAvailable < quantity) return res.json('Item ' + new_item.itemId + ' availablity is ' + new_item.quantityAvailable);

        //Ordered item quantity insert again to the relevant item in inventory
        await updateQuantity(ordered_item_id, ordered_item.itemName, ordered_item.itemPrice, (Number(ordered_item.quantityAvailable) + Number(order.rows[0].order_qty)));

        //Update order with new item and quantity
        const query = 'UPDATE "order" SET order_qty = $1, item_id = $2, total = $3 WHERE order_id = $4 AND item_id = $5 RETURNING *';
        const values = [quantity, new_item_id, (quantity * new_item.itemPrice), order_id, ordered_item_id];
        const result = await connection.query(query, values);
        console.log('Affected rows: ', result.rowCount);

        //Reduce newly ordered qunatity from relevant item
        await updateQuantity(new_item_id, new_item.itemName, new_item.itemPrice, (new_item.quantityAvailable - quantity));

        return res.json('Order has been successfully updated');

    } catch (error) {
        console.log(error);
        return res.json('Something went wrong');
    }

    //Check whether inventory exist or not by calling inventory server
    async function inventoryExist(ID) {
        const inventory = await axios.get(process.env.INVENTORY_SERVER, { params: { itemId: ID } });
        if (inventory.data.itemId) return inventory.data;
        return false;
    }

    //Update quantity availabaility of relevent inventory when order placed
    async function updateQuantity(itemID, itemName, itemPrice, updateQuantity) {
        await axios.put(process.env.INVENTORY_SERVER, { itemId: itemID, itemName: itemName, itemPrice: itemPrice, quantityAvailable: updateQuantity });
        return;
    }
};
