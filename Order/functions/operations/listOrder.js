const connection = require('./../../Service/connection');

module.exports = async function listOrder(req ,res){

    const { order_id } = req.body;

    try{
        const query = 'SELECT * FROM "order" WHERE order_id = $1'; // Enclose "order" in double quotes because it's a reserved keyword
        const result = await connection.query(query, [order_id]);

        if(result.rowCount!=0){
            return res.json(result.rows);
        }else{
            return res.json('There are no any orders');
        }
    }catch(error){
        console.log(error);
        return res.json('Something went wrong');
    }
};
