const express = require('express');
const router = express.Router();

//handel incoming GET requests to /orders 
router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'order were fetched'
    });
});

//handel incoming post requests to /orders 
router.post('/',(req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'order were createed',
        order: order
    });
});

//handel incoming single order(ID) GET requests to /orders 
router.get('/:orderdID',(req, res, next) => {
    res.status(200).json({
        message: 'order details',
        orderID: req.params.orderdID
    });
});

//handel incoming DELETE requests to /orders 
router.delete('/:orderdID',(req, res, next) => {
    res.status(200).json({
        message: 'order delete',
        orderID: req.params.orderdID
    });
});


module.exports = router;