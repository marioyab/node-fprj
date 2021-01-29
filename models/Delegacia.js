const {sequelize, Sequelize} = require('./db')

const Delegacia = sequelize.define('delegacias', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Delegacia