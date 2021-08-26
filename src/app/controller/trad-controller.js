//imports
const express = require('express');

//modules
const Stocks = require('../model/stocks.js');
const router = express.Router();

router.get('/lista', async(req, res) => {

    try {

        const stocks = await Stocks.find()

        res.json(stocks)

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao listar stocks'
        });
    }

});

router.get('/stocks-favoritos', async(req, res) => {

    try {

        const stocks = await Stocks.find({
            favorito: true
        })

        res.json(stocks)

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao listar stocks'
        });
    }

});

router.put('/set-favorite/:id_trade', async(req, res) => {

    try {
        const {
            id_trade
        } = req.params

        const {
            favorito
        } = req.body

        const stocks = await Stocks.findByIdAndUpdate({
            _id: id_trade
        }, {
            favorito: favorito
        })

        res.json(stocks)

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao finalizar pedido'
        });
    }

});

module.exports = app => app.use('/trade/v1/', router);