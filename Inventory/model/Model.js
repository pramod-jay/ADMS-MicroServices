const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    itemPrice: {
        type: Number,
        required: true
    },

    quantityAvailable: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('inventory', Schema);
