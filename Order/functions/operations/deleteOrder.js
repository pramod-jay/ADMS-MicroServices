const connection = require('./../../Service/connection');

module.exports = async function deleteOrder(req, res){
    // Define a route to delete an order by order_id
        const { order_id } = req.body; // Extract order_id from the URL parameter

        if (!order_id) {
            res.status(400).json({ error: 'Missing order_id parameter' });
            return;
        }

        try{
            const query = 'DELETE FROM "order" WHERE order_id = $1';
            const values = [order_id];
            const result = await connection.query(query, values);

            if (result.rowCount === 0) {
                return res.json('Order not found')
            } else {
                return res.json('Order has been successfully deleted');
            }
        }catch(error){
            console.log(error);
            return res.json('Something went wrong');
        }
};
