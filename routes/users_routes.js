const express = require('express')
const router = express.Router()

//Rota para obter todos os usuários
router.get('/', (req, res) =>{
    console.log('Get /users')
    res.send('Lista de usuários')
})

module.exports = router