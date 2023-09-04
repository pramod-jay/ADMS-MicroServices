var connection = require('../../service/connection');

module.exports = async function view_user(req,res){
    const query = "SELECT * FROM user.user WHERE userID=(?);"

    const values = [
        req.body.userID
    ]

    connection.query(query,values,(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Failed to fetch user' }); 

        }else{
            if(data.length ===0){
                return res.status(404).json({error:'User not found'})
                
            }else{
                const user= data[0];
                return res.status(200).json({ user });
            }
        }
    })
}