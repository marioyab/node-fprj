const { Sequelize, sequelize } = require('./db')

const Faixa = sequelize.define('faixas', {
    seq: {
        type: Sequelize.SMALLINT
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nivel: {
        type: Sequelize.INTEGER
    },
    idade_min: {
        type: Sequelize.INTEGER
    },
    kyu: {
        type: Sequelize.SMALLINT
    },
    dan: {
        type: Sequelize.SMALLINT
    }
})

module.exports = Faixa