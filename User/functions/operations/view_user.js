var connection = require('../../service/connection');

module.exports = async function view_user(req,res){
    const query = "SELECT * FROM user.user WHERE userID=(?);"

    const values = [
        req.body.userID
    ]

    connection.query(query,values,(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Failed to delete user' }); 
        }else{
            return res.status(201).json({ message: 'User deleted successfully' });
        }
    })
}