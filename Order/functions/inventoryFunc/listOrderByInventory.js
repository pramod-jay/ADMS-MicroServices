const connection = require('./../../Service/connection');


module.exports = async function listOrderByInventory(req, res) {
    const { inventoryId } = req.query;

    try{
        const query = 'SELECT * FROM "order" WHERE item_id  = $1';

        const result = await connection.query(query, [inventoryId]);

        if(result.rowCount!=0) return res.json(200)
        return res.json(404);
        
    }catch(error){
        console.log(error);
        return res.json('Something went wrong')
    }
};