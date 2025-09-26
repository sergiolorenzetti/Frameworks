
const sequelize = require('../database/database');
const AlunoModel = require('../models/alunoModels');
const EnderecoModel = require('../models/enderecoModel');
const { validarCPF, validarRG, validarDataNascimento } = require('../utils/utils')
const { Op } = require(`sequelize`)

exports.criarAluno = async (data) => {
    const { nome, ra, cpf, rg, data_nascimento, endereco, email, telefone } = data;
    validarCPF(cpf)
    if (!validarRG(rg)) {
        throw new Error("RG Inválido");

    }
    if (!validarDataNascimento(data_nascimento)) {
        throw new Error("A idade mínima é 16 anos");

    }
    const [aluno, criado] = await AlunoModel.findOrCreate(
        {
            where: {
                [Op.or]: [{ ra }, { cpf }, { rg }]
            }, defaults: {
                nome,
                ra,
                cpf,
                rg,
                data_nascimento,
                enderecos: endereco ? [endereco] : [],
                email,
                telefone,

            }, include: [{ model: EnderecoModel, as: "enderecos" }]
        },
    );

    if (!criado) {
        throw new Error('Aluno com RA, CPF ou RG já cadastrado');
    }

    return aluno;
}

exports.listarAlunos = async () => {
    try {
        const alunos = await AlunoModel.findAll({
            include: [{ model: EnderecoModel, as: "enderecos" }]
        });
        return alunos;
    } catch (error) {
        throw new Error('Erro ao listar alunos: ' + error.message);
    }
}

exports.validarDataNascimento = (dataNascimento, dataMinima = 16) => {
    if (!dataNascimento) return false;

    const nascimento = new Date(dataNascimento);
    if (isNaN(nascimento)) return false;

    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= dataMinima;
}

// Função para buscar aluno pelo ID único
exports.listarAlunoID = async (id) => {
    try {
        const aluno = await AlunoModel.findByPk(id, {
            include: [{ model: EnderecoModel, as: "enderecos" }]
        });
        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }
        return aluno;
    } catch (error) {
        throw new Error('Erro ao buscar aluno por ID: ' + error.message);
    }
}

// Função para atualizar o registro do aluno pela primary key (ID)
exports.atualizarAluno = async (id, dadosAtualizados) => {
    try {
        const aluno = await AlunoModel.findByPk(id);
        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }
        await aluno.update(dadosAtualizados);
        return aluno;
    } catch (error) {
        // Mostra detalhes do erro de validação
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            throw new Error(error.errors.map(e => e.message).join('; '));
        }
        throw new Error('Erro ao atualizar aluno: ' + error.message);
    }
}

// Função para deletar aluno por ID
exports.deletarAluno = async (id) => {
    try {
        const aluno = await AlunoModel.findByPk(id);
        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }
        await aluno.destroy();
        return { success: true, message: 'Aluno deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar aluno: ' + error.message);
    }
}