const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartScheme = new Schema({
    product_id : {
        type : Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    }
})

const Cart = mongoose.model('cart', CartScheme)

module.exports = Cart