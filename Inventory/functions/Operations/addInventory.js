const schema = require('../../model/Model');


module.exports = async function addInventory(req, res) {
    try {
        const exist = await inventoryExist(); //Check item alredy inserted one or not
        if (exist) {
            console.log("Already seved item");
            return res.json("This item has been already saved");
        } else {
            const inventory = new schema(req.body);
            try {
                await inventory.save();
                return res.json('Inventory insertion successfull');
            } catch (error) {
                console.log(error);
                return res.json('Inventory insertion unsuccessfull');
            }
        }
    } catch (error) {
        console.log(error);
        return res.json("Something went wrong");
    }

    //Check whether item already exist or not
    async function inventoryExist() {
        try {
            const inventory = await schema.findOne({itemId:req.body.itemId});
            if (inventory) return true;
            return false;
        } catch (error) {
            console.log(error);
            return res.json('Something went wrong');
        }
    };
};