const express = require('express');
const router = express.Router();

//handel incoming GET requests to /products 
router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

//handel incoming POST request to /products
router.post('/',(req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    });
});

//handel incoming single product(ID) GET request to /products
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if (id === 'special') {
        res.status(200).json({
            message: 'you discovered the special ID',
            id: id
        });
    }else {
        res.status(200).json({
            message: 'you passed an id'
            
        })
    };
});

//handel incoming PATCH request to /products
router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Update prouct'  
    });
});

//handel incoming DELETE request to /products
router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted prouct'  
    });
});


module.exports = router;