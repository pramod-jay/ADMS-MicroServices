var connection = require("../../service/connection");

module.exports = async function update_user(req, res) {
    if (!req.body.userID) {
      return res.status(400).json({ error: 'userID is required for the update' });

    }

    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.telNo && !req.body.address) {
      return res.status(400).json({ error: 'No detail are given to update' });

    }

    const checkUserQuery = "SELECT COUNT(*) AS count FROM `user`.`user` WHERE `userID` = (?);"
    const checkUserValues = [req.body.userID];

    connection.query(checkUserQuery, checkUserValues, (err, checkUserData) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to check user existence' });

      } else {
        const userExists = checkUserData[0].count === 1;

        if (!userExists) {
          return res.status(404).json({ error: 'User not found for update' });
        }


        let query = "UPDATE `user`.`user` SET ";
        let values = [];
        let fieldsToUpdate = [];


        if (req.body.firstName) {
          fieldsToUpdate.push("`firstName` = (?)");
          values.push(req.body.firstName);
        }

        if (req.body.lastName) {
          fieldsToUpdate.push("`lastName` = (?)");
          values.push(req.body.lastName);
        }

        if (req.body.email) {
          fieldsToUpdate.push("`email` = (?)");
          values.push(req.body.email);
        }

        if (req.body.telNo) {
          fieldsToUpdate.push("`telNo` = (?)");
          values.push(req.body.telNo);
        }

        if (req.body.address) {
          fieldsToUpdate.push("`address` = (?)");
          values.push(req.body.address);
        }


        values.push(req.body.userID);

        query += fieldsToUpdate.join(', ');

        query += " WHERE (`userID` = (?));";

        connection.query(query, values, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to update user' });

          } else {
            return res.status(201).json({ message: 'User details updated successfully' });

          }
        });
      }
    });
};


