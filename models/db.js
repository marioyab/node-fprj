const Sequelize = require('sequelize')

const sequelize = new Sequelize('federacao', 'mario', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    },
    timezone: '-03:00'
})

sequelize.authenticate().then( () => {
    console.log('Conectado ao Banco de Dados.')
}).catch(erro => {
    console.log('Falha ao tentar se conectar ao Banco de Dados.'+erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
