//***This function belongs to create new inventory***

const schema = require('../../model/Model');


module.exports = async function addInventory(req, res) {
    try {
        const exist = await inventoryExist(); //Check item alredy inserted one or not
        if (exist) {
            console.log("Already seved item");
            return res.json("This item has already saved");
        } else {
            const newInventory = new schema(req.body);
            try {
                await newInventory.save();
                return res.json('Inventory insertion successful');
            } catch (error) {
                console.log(error);
                return res.json('Inventory insertion unsuccessful');
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