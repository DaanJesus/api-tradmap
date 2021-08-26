const mongoose = require('mongoose');
require('dotenv').config();

const StocksSchema = new mongoose.Schema({

    stock: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    variation: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    favorito: {
        type: Boolean,
        default: false
    },
    chart: {
        type: Array,
    }

});

const Stocks = mongoose.model('Stocks', StocksSchema);

module.exports = Stocks;