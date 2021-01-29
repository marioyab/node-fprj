const db = require('./db')
const Academia = require('./Academia')

const Mensalidade = db.sequelize.define('mensalidades', {
    id_academia: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    ano: {
        type: db.Sequelize.SMALLINT,
        allowNull: false
    },
    pago01: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor01: {
        type: db.Sequelize.STRING
    },
    pago02: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor02: {
        type: db.Sequelize.STRING
    },
    pago03: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor03: {
        type: db.Sequelize.STRING
    },
    pago04: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor04: {
        type: db.Sequelize.STRING
    },
    pago05: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor05: {
        type: db.Sequelize.STRING
    },
    pago06: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor06: {
        type: db.Sequelize.STRING
    },
    pago07: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor07: {
        type: db.Sequelize.STRING
    },
    pago08: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor08: {
        type: db.Sequelize.STRING
    },
    pago09: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor09: {
        type: db.Sequelize.STRING
    },
    pago10: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor10: {
        type: db.Sequelize.STRING
    },
    pago11: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor11: {
        type: db.Sequelize.STRING
    },
    pago12: {
        type: db.Sequelize.BOOLEAN,
        default: false
    },
    valor12: {
        type: db.Sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Mensalidade.belongsTo(Academia, { foreignKey: 'id_academia'})
module.exports = Mensalidade