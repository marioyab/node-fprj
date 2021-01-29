const { Sequelize, sequelize } = require('./db')

const Atividade = sequelize.define('tabativ', {
    codativ: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        defaultValue: '1'
    },
    vinculado: {
        type: Sequelize.STRING
    },
    pto_regional: {
        type: Sequelize.SMALLINT
    },
    pto_estadual: {
        type: Sequelize.SMALLINT
    },
    pto_sul: {
        type: Sequelize.SMALLINT
    },
    pto_nacional: {
        type: Sequelize.SMALLINT
    },
    pto_internacional: {
        type: Sequelize.SMALLINT
    },
    pto: {
        type: Sequelize.SMALLINT
    }
},{
    freezeTableName: true
})

Atividade.removeAttribute('id')

module.exports = Atividade