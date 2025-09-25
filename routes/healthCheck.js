const express = require('express')
const router = express.Router()
const sequelize = require('../database/database');

router.get('/', (req, res) => {
    sequelize.authenticate()
    .then(() => {
        res.send('Api funcionando! 🚀')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        res.status(500).send('Erro ao conectar ao banco de dados.');
    });
})

module.exports = router