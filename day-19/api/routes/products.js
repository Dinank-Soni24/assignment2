const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const mongoose = require('mongoose');

//handel incoming GET requests to /products 
router.get('/',(req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then( docs => {
            const respons = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(respons);
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
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
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
    .select('name price _id')
    .exec()
    .then( doc => {
        console.log(doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/products' 
                }
            });
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
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
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
            res.status(200).json({
                message: 'product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/',
                    body: {name: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;