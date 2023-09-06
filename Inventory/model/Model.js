const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    itemId: {
        type: String,
        require: true
    },

    itemName: {
        type: String,
        require: true
    },

    itemPrice: {
        type: Number,
        require: true
    },

    quantityAvailable: {
        type: Number,
        require: false
    }
});

module.exports = mongoose.model('inventory', Schema);
