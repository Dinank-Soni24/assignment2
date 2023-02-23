const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/',(req, res, next) => {
    res.status(201).json({
        message: 'Handling POST request to /products'
    });
});

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

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Update prouct'  
    });
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted prouct'  
    });
});


module.exports = router;