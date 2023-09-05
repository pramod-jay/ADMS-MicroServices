var connection = require('../../service/connection');

module.exports = async function delete_user(req, res) {
    if (!req.body.userID) {
        return res.status(400).json({ error: 'userID is required for deletion' });
    }

    const checkUserQuery = "SELECT COUNT(*) AS count FROM `user`.`user` WHERE `userID` = (?);"
    const checkUserValues = [req.body.userID];

    connection.query(checkUserQuery, checkUserValues, (err, checkUserData) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to check user existance' });

        } else {
            const userExists = checkUserData[0].count === 1;

            if (!userExists) {
                return res.status(404).json({ error: 'User not found for deletion' });
            }

            const deleteUserQuery = "DELETE FROM user.user WHERE userID=(?);"

            const deleteUserValues = [
                req.body.userID
            ]

            connection.query(deleteUserQuery, deleteUserValues, (deleteUserErr, deleteUserData) => {
                if (deleteUserErr) {
                    console.log(deleteUserErr);
                    return res.status(500).json({ error: 'Failed to delete user' });
                } else {
                    return res.status(201).json({ message: 'User deleted successfully' });

                }
            });
        }
    });
};