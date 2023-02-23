const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productsSchema);