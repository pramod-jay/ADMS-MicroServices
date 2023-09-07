//***This function belongs to update inventory***


const schema = require('../../model/Model');


module.exports = async function updateInventory(req, res) {

    const { itemId, itemName, itemPrice, quantityAvailable } = req.body;

    const inventory = await inventoryExist();

    try {
        if (inventory) {
            const response = await schema.updateOne({itemId : itemId},{itemName : itemName, itemPrice: itemPrice, quantityAvailable: quantityAvailable});
            console.log(response);
            return res.json('Inventory has been updated successfully');
        } else {
            console.log('Not exist');
            return res.json('Inventory does not exist');
        }
    } catch (error) {
        console.log(error);
        return res.json('Something went wrong');
    }

    //Check whether item already exist or not
    async function inventoryExist() {
        try {
            const inventory = await schema.findOne({ itemId: itemId });
            if (inventory) return true
            return false;
        } catch (error) {
            console.log(error);
            return res.json('Something went wrong');
        }
    };
}