const db = require('./db')
const Atleta = require('./Atleta')

const Carteirinha = db.sequelize.define('carteirinhas', {
    id_atleta: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    ano: {
        type: db.Sequelize.SMALLINT,
        allowNull: false
    },
    impresso: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: db.Sequelize.DATE
    },
    updatedAt: {
        type: db.Sequelize.DATE
    }
})


Carteirinha.belongsTo(Atleta, { foreignKey: 'id_atleta'})
module.exports = Carteirinha