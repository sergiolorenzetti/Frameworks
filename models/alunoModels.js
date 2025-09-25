const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const aluno = sequelize.define('aluno', {
    id_aluno:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ra: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false        
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW        
    },
    data_atualizacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'aluno',
    timestamps: false
})

module.exports = aluno