const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const mongoose = require('mongoose');

//handel incoming GET requests to /products 
router.get('/',(req, res, next) => {
    Product.find()
        .exec()
        .then( docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

//handel incoming POST request to /products
router.post('/',(req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request to /products',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});

//handel incoming single product(ID) GET request to /products
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then( doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else {
            res.status(404).json({message: 'NO valid entry found for provided ID'})
        }
    })
    .catch( err =>{ 
        console.log(err);
        res.status(500).json({error : err});
    })
});

//handel incoming PATCH request to /products
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    
    Product.updateMany({_id: id}, { $set: req.body })
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//handel incoming DELETE request to /products
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.remove({_id: id})
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;