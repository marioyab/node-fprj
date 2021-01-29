const db = require('./db')
const Delegacia = require('./Delegacia')

const Academia = db.sequelize.define('academias', {
    codigo: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    razao: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    fantasia: {
        type: db.Sequelize.STRING
    },
    cnpj: {
        type: db.Sequelize.STRING
    },
    inscricao: {
        type: db.Sequelize.STRING
    },
    dtcadastro: {
        type: db.Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: db.Sequelize.NOW,
    },
    id_delegacia: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tipofiliacao: {
        type: db.Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 2
    },
    tipoDesc: {
        type: db.Sequelize.VIRTUAL,
        get() {
            const rawValue = `${this.tipofiliacao
    }`
            switch (rawValue) {
                case '0':
                    return 'INATIVA'
                    break
                case '1':
                    return 'ISENTA'
                    break
                case '2':
                    return 'REGIONAL' 
                    break
                case '3':
                    return 'VINCULADA'
                    break
                case '4':
                    return 'FILIADA'
                    break
                default:
                    return 'NÃO DEFINIDO'
            }
        }
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    numero: {
        type: db.Sequelize.STRING
    },
    complemento: {
        type: db.Sequelize.STRING
    },
    bairro: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING
    },
    contato: {
        type: db.Sequelize.STRING
    },
    fone: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    correspondencia: {
        type: db.Sequelize.STRING
    },
    pritecnico: {
        type: db.Sequelize.STRING
    },
    segtecnico: {
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
})

Academia.removeAttribute('id')
Academia.belongsTo(Delegacia, { foreignKey: 'id_delegacia'})

module.exports = Academia