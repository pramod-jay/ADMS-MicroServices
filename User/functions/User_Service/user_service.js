var connection= require ('./../../service/connection');

module.exports = async function user_service(req, res){
    const query = "INSERT INTO `user`.`user` (`firstName`, `lastName`, `email`, `telNo`, `address`) VALUES ( (?), (?), (?),(?),(?));"

    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.telNo,
        req.body.address

    ]

    connection.query(query,values,(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Failed to create user' }); //error on the server and the request could not be generated
        }else{
            return res.status(201).json({ message: 'User created successfully' }); //Created. The request has been fulfilled
        }
    })

}