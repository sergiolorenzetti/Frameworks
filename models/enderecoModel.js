const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Aluno = require("./alunoModels");

const Endereco = sequelize.define("Endereco", {
  id_endereco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_aluno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Aluno,
      key: "id_aluno",
    },
    onDelete: "CASCADE",
  },
  logradouro: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING(10),
  },
  complemento: {
    type: DataTypes.STRING(50),
  },
  bairro: {
    type: DataTypes.STRING(80),
  },
  cidade: {
    type: DataTypes.STRING(80),
  },
  estado: {
    type: DataTypes.STRING(2),
  },
  cep: {
    type: DataTypes.STRING(9),
  },
}, {
  tableName: "endereco",
  timestamps: false,
});

Aluno.hasMany(Endereco, { foreignKey: "id_aluno", as: "enderecos" });
Endereco.belongsTo(Aluno, { foreignKey: "id_aluno", as: "aluno" });

module.exports = Endereco;