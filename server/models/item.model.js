const { Double } = require('bson');
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [
            true, 'Item name is required'
        ]
    },

    price: {
        type: Number,
        required: [
            true, 'Price is required'
        ]
    },

    sellerName: {
        type: String,
        required: [
            true, 'Seller Name is required'
        ]
    },

    description: {
        type: String,
        required: [
            true, 'Description is required'
        ]
    },

    venmoHandle: {
        type: String
    }


}, {timestamps: true});

module.exports = mongoose.model('Item', ItemSchema);