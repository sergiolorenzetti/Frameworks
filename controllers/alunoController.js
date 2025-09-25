const AlunoService = require('../services/alunoservice');

exports.criarAluno = async (req, res) => {
    try {
        const aluno = await AlunoService.criarAluno(req.body);
        res.status(201).json({ success: true, message: `Aluno cadastrado com sucesso` });

    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(400).json({ success: false, error: error.message });
    }
}
// Adiciona o método para listar todos os alunos
exports.listarAlunos = async (req, res) => {
    try {
        const alunos = await AlunoService.listarAlunos();
        res.status(200).json({ success: true, alunos });
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        res.status(400).json({ success: false, error: error.message });
    }
}
// Método para buscar aluno pelo ID
exports.listarAlunoID = async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await AlunoService.listarAlunoID(id);
        res.status(200).json({ success: true, aluno });
    } catch (error) {
        console.error('Erro ao buscar aluno por ID:', error);
        res.status(404).json({ success: false, error: error.message });
    }
}

// Método para atualizar aluno pelo ID
exports.atualizarAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const dadosAtualizados = req.body;
        const alunoAtualizado = await AlunoService.atualizarAluno(id, dadosAtualizados);
        res.status(200).json({ success: true, aluno: alunoAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(400).json({ success: false, error: error.message });
    }
}

// Método para deletar aluno pelo ID
exports.deletarAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await AlunoService.deletarAluno(id);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(400).json({ success: false, error: error.message });
    }
}