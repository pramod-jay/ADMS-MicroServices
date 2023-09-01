var connection = require('./../../Service/connection');

module.exports = async function deleteInventory(req, res){
    try{
        const inventory = connection.collection('inventory');

        const query = req.body;

        const response = await inventory.deleteMany(query);

        console.log(response);
        return res.json('Inventory deletion successfull');
    }catch(error){
        console.log(error);
        return res.json('Inventory deletion unsuccessfull');
    };
};