
const { Sequelize, sequelize } = require('./db')
const Academia = require('./Academia')
const Faixa = require('./Faixa')

const Atleta = sequelize.define('atletas', {
    codigo: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: { 
        type: Sequelize.STRING
    },
    sexo: {
        type: Sequelize.STRING
    },
    datanasc: {
        type: Sequelize.DATEONLY
    },
    endereco: {
        type: Sequelize.STRING
    },
    bairro: {
        type: Sequelize.STRING
    },
    numero: {
        type: Sequelize.STRING
    },
    complemento: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING,
        defaultValue: 'PR'
    },
    cep: {
        type: Sequelize.STRING
    },
    fone: {
        type: Sequelize.STRING
    },
    tiporegistro: {
        type: Sequelize.STRING
    },
    tipoDesc: {
        type: Sequelize.VIRTUAL,
        get() {
            const rawValue = `${this.tiporegistro
    }`
            const sexo = `${this.getDataValue('sexo')}`
            switch (rawValue) {
                case '0':
                    return sexo == 'M' ?'INATIVO':'INATIVA'
                    break
                case '1':
                    return sexo == 'M' ? 'ISENTO':'ISENTA'
                    break
                case '2':
                    return sexo == 'M' ? 'REGIONAL' :'REGIONAL'
                    break
                case '3':
                    return sexo == 'M' ? 'FILIADO' : 'FILIADA'
                    break
                default:
                    return 'NÃO DEFINIDO'
            }
        }
    },
    email: {
        type: Sequelize.STRING
    },
    id_academia: {
        type: Sequelize.INTEGER
    },
    anuidade: {
        type: Sequelize.STRING
    },
    observacao: {
        type: Sequelize.TEXT
    },
    dataultpromo: {
        type: Sequelize.DATEONLY
    },
    id_faixa: {
        type: Sequelize.INTEGER
    },
    dtcadastro: {
        type: Sequelize.DATEONLY
    },
    celular: {
        type: Sequelize.STRING
    },
    viaselo: {
        type: Sequelize.STRING
    },
    foto: {
        type: Sequelize.STRING
    },
    nome_cart: {
        type: Sequelize.STRING
    }
}, {
    tableFreezeName: true,
    tableName: 'atletas'
})

Atleta.removeAttribute('id')
Atleta.belongsTo(Academia, { foreignKey: 'id_academia' })
Atleta.belongsTo(Faixa, { foreignKey: 'id_faixa' })

module.exports = Atleta