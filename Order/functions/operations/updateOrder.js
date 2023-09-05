const connection = require('./../../Service/connection');

module.exports = async function updateOrder(req, res){
    const { order_id, order_qty, order_time, order_date } = req.body; // Extract updated data from the request body

    if (!order_id || !order_qty || !order_time || !order_date) {
        res.status(400).json({ error: 'Missing required data' });
        return;
    }

    try{
        const query = 'UPDATE "order" SET order_qty = $1, order_time = $2, order_date = $3 WHERE order_id = $4 RETURNING *';
        const values = [order_qty, order_time, order_date, order_id];
        const result = await connection.query(query, values);

        if (result.rowCount === 0) {
            return res.json('Order does not exist');
        } else {
            return res.json('Order has been successfully updated');
        }
    }catch(error){
        console.log(error);
        return res.json('Something went wrong');
    }
};
