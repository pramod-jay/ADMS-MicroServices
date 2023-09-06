const connection = require('../../Service/connection');

module.exports = async function listOrderByUser(req, res){
    const { userId } = req.query;

    try{
        const query = 'SELECT * FROM "order" WHERE user_id = $1';

        const result = await connection.query(query, [userId]);

        if(result.rowCount!=0) return res.json(200)
        return res.json(404);
        
    }catch(error){
        console.log(error);
        return res.json('Something went wrong')
    }
};