//***This function belongs to delete user***

const connection = require('../../service/connection');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = async function delete_user(req, res) {
    if (!req.body.userID) {
        return res.status(400).json({ error: 'userID is required for deletion' });
    }

    const checkUserQuery = "SELECT COUNT(*) AS count FROM `user`.`user` WHERE `userID` = (?);"
    const checkUserValues = [req.body.userID];

    const userInOrder = await userExistInOrder(req.body.userID);

    connection.query(checkUserQuery, checkUserValues, (err, checkUserData) => {
        if (err) {
            console.log(err);
            return res.json('Failed to check user existence');

        } else {
            const userExists = checkUserData[0].count === 1;

            if (!userExists) {
                return res.json('User not found for deletion');
            }

            if(userInOrder==200) return res.json('User have orders. Cannot Delete');

            const deleteUserQuery = "DELETE FROM user.user WHERE userID=(?);"

            const deleteUserValues = [
                req.body.userID
            ]

            connection.query(deleteUserQuery, deleteUserValues, (deleteUserErr, deleteUserData) => {
                if (deleteUserErr) {
                    console.log(deleteUserErr);
                    return res.json('Failed to delete user');
                } else {
                    console.log(deleteUserData);
                    return res.json('User deleted successfully');
                }
            });
        }
    });

    //Check whether user have orders
    async function userExistInOrder(userID) {
        const response = await axios.get(process.env.ORDER_SERVER + 'orderByUser', { params: { userId: userID } });
        return response.data;
    };

};