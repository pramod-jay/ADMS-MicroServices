//***This function belongs to create new user***

var connection= require ('../../service/connection');

module.exports = async function create_user(req, res){
    const createUserQuery = "INSERT INTO `user`.`user` (`firstName`, `lastName`, `email`, `telNo`, `address`) VALUES ( (?), (?), (?),(?),(?));"

    const createUserValues = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.telNo,
        req.body.address

    ]

    connection.query(createUserQuery,createUserValues,(createUserErr,createUserData)=>{
        if(createUserErr){
            console.log(createUserErr);
            return res.status(500).json({ error: 'Failed to create user' }); //error on the server and the request could not be generated
        }else{
            return res.status(201).json({ message: 'User created successfully' }); //Created. The request has been fulfilled
        }
    })

}

