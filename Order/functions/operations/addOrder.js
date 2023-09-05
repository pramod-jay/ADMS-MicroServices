const connection = require('./../../Service/connection');

module.exports = async function addOrder(req, res){

    // Define a route to add a new order (POST request to add an order)
        const { order_id, order_qty, order_time,order_date } = req.body; // Extract data from the request body

        if (!order_id || !order_qty || !order_time || !order_date) {
            res.status(400).json({ error: 'Missing required data' });
            return;
        }

        try {
            const query = 'INSERT INTO "order" (order_id, order_qty, order_time,order_date) VALUES ($1, $2, $3, $4) RETURNING *';

            const values = [order_id, order_qty, order_time, order_date];
            const result = await connection.query(query, values);

            console.log(result);



            return res.json('Order has been created successfully') // Send the inserted order as JSON with a 201 Created status
        }catch(error){
            console.log(error.detail)
            return res.json('Something went wrong: '+error.detail);
        }
}
