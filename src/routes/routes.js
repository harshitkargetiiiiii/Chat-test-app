const express = require('express');
const Products = require('../models/Products')
const Cart = require('../models/Cart')
const fs = require('fs')

const router = express.Router()


router.get('/products', (req,res) => {
    try{
        return Products.find()
        .then(data => {
            if(data && data.length > 0){
                return res.status(200).json(data)
            }
            const file_data = JSON.parse(fs.readFileSync('src/data/product.json', 'utf8'))

            return Products.insertMany(file_data)

        })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json({error: error.stack})
        })
    } catch(error){
        return res.status(500).json({error: error.stack})
    }
})

router.post('/cart', (req, res)=> {
    const productId = req.body.product_id

    return Cart.findOne({product_id: productId})
    .then(data => {
        if(data){
            return Cart.findOneAndUpdate({product_id: productId},{
                quantity: data.quantity + 1
            }, {new: true, useFindAndModify: false})
        }
        
    return new Cart({
        product_id: productId,
        quantity: 1
    }).save()
    })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(err => {
        return res.status(500).json({error: err.stack})
    })
})

    router.get('/cart', (req,res) => {
        return Cart.aggregate([{
            '$lookup':{
                'from': 'products',
                'localField': 'product_id',
                'foreignField':'product_id',
                'as':'product_data'
            }
        }]).exec()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json({err: err.stack})
        })
    })


module.exports = router;