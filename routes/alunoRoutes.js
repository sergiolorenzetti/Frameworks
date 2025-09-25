const express = require('express')
const router = express.Router()
const alunoController = require('../controllers/alunocontroller')


// Rota para listar todos os alunos
router.get('/', alunoController.listarAlunos)

// Rota para buscar aluno por ID
router.get('/:id', alunoController.listarAlunoID)

// Rota para atualizar aluno por ID
router.put('/:id', alunoController.atualizarAluno)

// Rota para deletar aluno por ID
router.delete('/:id', alunoController.deletarAluno)

router.post('/', alunoController.criarAluno)

module.exports = router