const { Sequelize, sequelize } = require('./db')

const Calendario = sequelize.define('tabeventos', {
    codevento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    dataevento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    local: {
        type: Sequelize.STRING
    }, 
    nivel: {
        type: Sequelize.STRING
    },
    descricao: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING
    },
    sit: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Calendario.removeAttribute('id')

module.exports = Calendario