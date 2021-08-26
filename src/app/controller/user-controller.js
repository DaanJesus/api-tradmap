//imports
const express = require('express');

//modules
const User = require('../model/user.js');
const router = express.Router();

router.post('/login', async(req, res) => {

    try {

        const { name, password } = req.params

        const user = await User.findOne({
            name: name,
            password: password
        })

        res.json({ message: `Bem vindo de volta, ${user.name}` })

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Usuário não encontrado.'
        });
    }

});

router.post('/register', async(req, res) => {

    try {

        const { name, email, password } = req.body

        const user = await User.create({
            name,
            email,
            password
        })

        res.json({ message: 'Usuario cadastrado com sucesso.' })

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao se cadastrar'
        });
    }

});

router.put('/update-user/:id_user', async(req, res) => {

    try {
        const {
            id_user
        } = req.params

        const {
            favorito
        } = req.body

        const user = await User.findByIdAndUpdate({
            _id: id_user
        }, {

        })

        res.json(user)

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao atualizar perfil.'
        });
    }

});

module.exports = app => app.use('/trade/v1', router);