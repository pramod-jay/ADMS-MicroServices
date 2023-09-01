var connection = require('./../../Service/connection');

module.exports = async function addInventory(req ,res){
    try{
        const inventory = connection.collection('inventory');

        const query = req.body;
        
        const response = await inventory.insertOne(query);

        console.log(response.insertedId);
        return res.json('Inventory insertion successfull');
    }catch(error){
        console.log(error);
        return res.json('Inventory insertion unsuccessfull');
    }
};
