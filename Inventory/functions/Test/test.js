var connection = require('./../../Service/connection');

module.exports = async function test(req, res) {

    try {
        const inventory = connection.collection('inventory');

        const query = req.body;

        const options = { projection: { _id: 0,  firstName: 1, lastName: 1 }};

        const response = await inventory.findOne(query, options);

        console.log("Data fetched successfully");

        return res.json(response);

    } catch(err){
        console.log(err);
    }
    // return res.json('Test respond from inventory');


};