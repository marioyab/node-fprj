const { sequelize, Sequelize } = require('./db')
const Atleta = require('./Atleta')
const Faixa = require('./Faixa')
const Calendario = require('./Calendario')
const Atividade = require('./Atividade')

const Ata = sequelize.define('atas', {
    codcand: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    codevento: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    codativ: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pto: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    tipoativ: {
        type: Sequelize.SMALLINT,
        defaultValue: 1
    },
    pto_computado: {
        type: Sequelize.STRING,
        defaultValue: 'N',
        allowNull: false
    },
    percentual: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
        allowNull: false
    },
    id_faixa: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER
    },
    obs: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
})

Ata.removeAttribute('id')
Ata.belongsTo(Atleta, {foreignKey: 'codcand'})
Ata.belongsTo(Faixa, {foreignKey: 'id_faixa'})
Ata.belongsTo(Calendario, { foreignKey: 'codevento'})
Ata.belongsTo(Atividade, {foreignKey: 'codativ'})

module.exports = Ata
