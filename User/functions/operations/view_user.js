var connection = require('../../service/connection');

module.exports = async function view_user(req, res) {
    const viewUserQuery = "SELECT * FROM user.user WHERE userID=(?);"

    const viewUserValues = [
        req.body.userID
    ]

    connection.query(viewUserQuery, viewUserValues, (viewUserErr, viewUserData) => {
        if (viewUserErr) {
            console.log(viewUserErr);
            return res.status(500).json({ error: 'Failed to fetch user' });

        } else {
            if (viewUserData.length === 0) {
                return res.status(404).json({ error: 'User not found' })

            } else {
                const user = viewUserData[0];
                return res.status(200).json({ user });
            }
        }
    })
}