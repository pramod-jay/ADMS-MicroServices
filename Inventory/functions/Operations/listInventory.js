//***This function belongs to retrive inventory***

const schema = require('../../model/Model');

module.exports = async function listInventory(req, res){
    try {
        const inventory = await schema.findOne({itemId:req.query.itemId});
            if (inventory) {
                console.log("Inventory exist")
                return res.json(inventory);
            } else {
                console.log("Inventory not exist");
                return res.json("Inventory does not exist");
            }
    } catch (error) {
        console.log(error);
        return res.json('Something went wrong');
    }
};