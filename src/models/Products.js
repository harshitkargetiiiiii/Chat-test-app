const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductScheme = new Schema({
    product_id : {
        type : Number,
        required: true
    },
    product_name : {
        type: String,
        required: true
    },
    sku_code : {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

const Product = mongoose.model('products', ProductScheme)

module.exports = Product