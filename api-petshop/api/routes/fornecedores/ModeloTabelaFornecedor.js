const Sequelize = require('sequelize');
const instancia = require('../../db')

const colunas = {
  empresa:{
    type: Sequelize.STRING,
    allowNull: false
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.ENUM('ração', 'brinquedos'),
    allowNull: false
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'Fornecedores',
  timestamps: true,
  createdAt: 'dataCriacao',
  updatedAt: 'dataAtualizacao',
  version: 'versao'
}

module.exports = instancia.define('Fornecedor', colunas, opcoes);