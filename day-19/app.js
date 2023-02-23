const express = require('express');
const morgan = require('morgan');

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'))

//Routes which should handle requests 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//error handling
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        err: {
            message: err.message
        }
    });
});

module.exports = app;