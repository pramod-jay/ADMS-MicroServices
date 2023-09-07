//***This function belongs to retrive order***

const connection = require('./../../Service/connection');
const axios = require('axios');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

module.exports = async function listOrder(req, res) {

    const { order_id } = req.body;

    try {
        //Get all orderes of requested orderID
        const query = 'SELECT * FROM "order" WHERE order_id = $1'; 
        const result = await connection.query(query, [order_id]);

        let totalAmount = 0;
        const itemId = [];
        const itemName = [];
        const itemPrice = [];
        const quantity = [];
        const itemTotal = [];

        const returnData = [];

        if (result.rowCount != 0) {
            //Get user details of the order from orderMS
            const user = await getUserDetails(result.rows[0].user_id);

            //Append user data to the return array
            returnData.push({ Order_ID: result.rows[0].order_id, Customer_ID: user.userID, Cutomer_Name: user.firstName + " " + user.lastName, Cutomer_TP: user.telNo, Order_Date: moment(result.rows[0].order_date).format('YYYY-DD-MM'), Order_Time: moment(result.rows[0].order_time).format('hh:mm:ss') });

            let index = 0;

            for (const element of result.rows) {

                //Get item details of each item from inventoryMS
                const item = await getItemDetails(element.item_id); //call getItemDetails function for each item

                //Append data to specific array
                itemId.push(item.itemId); 
                itemName.push(item.itemName); 
                itemPrice.push(Number(item.itemPrice).toFixed(2)); 
                quantity.push(result.rows[index].order_qty); 
                itemTotal.push(Number(result.rows[index].total).toFixed(2)); 
                index++;

                totalAmount += element.total; //Calculate total amount of the order
            }

            //Append ordered item details with quantity to the return array
            for (let i = 0; i < itemId.length; i++) {
                returnData.push({ item: itemId[i] + ":" + itemName[i] + " -> " + itemPrice[i] + " x " + quantity[i] + " = " + itemTotal[i] });
            }

            //Finally append toatal amount to the return array
            returnData.push({ Total_Amount: (totalAmount).toFixed(2) });

            return res.json(returnData);
            
        } else {
            return res.json('There are no any orders');
        }
    } catch (error) {
        console.log(error);
        return res.json('Something went wrong');
    }

    //get item details from the inventory server
    async function getItemDetails(itemId) {
        const item = await axios.get(process.env.INVENTORY_SERVER, { params: { itemId: itemId } });
        return item.data;
    };

    //get user details from the user server
    async function getUserDetails(userId) {
        const user = await axios.get(process.env.USER_SERVER, { params: { userID: userId } })
        return user.data;
    }
};
