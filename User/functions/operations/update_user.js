var connection = require("../../service/connection");

module.exports = async function update_user(req,res){
    const query = "UPDATE `user`.`user` SET `firstName` = (?), `lastName` = (?), `email`=(?), `telNo`=(?),`address`=(?) WHERE (`userID` = (?));"

    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.telNo,
        req.body.address,
        req.body.userID
    ]

    connection.query(query,values,(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:'Failed to update user'});
        }else{
            return res.status(201).json({message:'User details updated successfully'});
        }
    })
}

// select the user details and take number of updates along with the key so "UPDATE `user`.`user` SET (?) = (?), like wise take the key and updated data 
//`lastName` = (?), `email`=(?), `telNo`=(?),`address`=(?)
// WHERE (`userID` = (?));"" condition is same like this 
//use a loop
