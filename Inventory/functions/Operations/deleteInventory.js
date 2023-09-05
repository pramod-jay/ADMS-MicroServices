const schema = require('../../model/Model')


module.exports = async function deleteInventory(req, res){
    try{
        const exist = await inventoryExist();

        if(exist){
            schema.deleteOne(req.body)
            .then(function(){
                console.log("Deleted succefully");
                return res.json("Inventory has been deleted succefully")
            }).catch(function(error){
                onsole.log(error);
                return res.json("Something went wrong");
            })
        }else{
            console.log("Not exist");
            return res.json("Inventory does not exist");
        }
    }catch(error){
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