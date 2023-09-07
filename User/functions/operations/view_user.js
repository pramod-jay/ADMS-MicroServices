//***This function belongs to retrive user***

var connection = require('../../service/connection');

module.exports = async function view_user(req, res) {
    const viewUserQuery = "SELECT * FROM user.user WHERE userID=(?);"

    const viewUserValues = [
        req.query.userID
    ]

    connection.query(viewUserQuery, viewUserValues, (viewUserErr, viewUserData) => {
        if (viewUserErr) {
            console.log(viewUserErr);
            return res.json('Failed to fetch user');

        } else {
            if (viewUserData.length === 0) {
                return res.json('User not found');

            } else {
                const user = viewUserData[0];
                return res.json(user);
            }
        }
    })
}