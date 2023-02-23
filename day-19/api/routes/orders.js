const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'order were fetched'
    });
});

router.post('/',(req, res, next) => {
    res.status(200).json({
        message: 'order were createed'
    });
});

router.get('/:orderdID',(req, res, next) => {
    res.status(200).json({
        message: 'order details',
        orderID: req.params.orderdID
    });
});

router.delete('/:orderdID',(req, res, next) => {
    res.status(200).json({
        message: 'order delete',
        orderID: req.params.orderdID
    });
});


module.exports = router;