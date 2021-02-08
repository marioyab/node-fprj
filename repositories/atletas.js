const Atleta = require('../models/Atleta')
const { Op } = require('sequelize')
const Academia = require('../models/Academia')
const Faixa = require('../models/Faixa')  

exports.getBusca = async (nome) => {
    let str = nome.toUpperCase()
    try {
        const atletas = await Atleta.findAll({
            where: {
                [Op.and]: [
                    { nome: { [Op.substring]: str }},
                    { tiporegistro: {[ Op.gt]: 0 }}
                ]
            },
            include: [{
                model: Academia,
                attributes: ['codigo','razao']
            },{
                model: Faixa,
                attributes: ['id', 'nome']
            }],
            order: ['nome']
        })
        return atletas
    } catch (error) {
        return error
    }
}

exports.getByCodigo = async (codigo) => {
    try {
        const resp = await Atleta.findByPk(codigo)
        
        return resp
    } catch (error) {
        return error
    }
}
exports.getEditar = async (codigo) => {
    try {
        const atleta = await Atleta.findByPk(
            codigo, {
            include: [{
                model: Academia,
                attributes: ['codigo', 'razao']
            }, {
                model: Faixa,
                attributes: ['id', 'nome', 'seq']
            }]
        }
        )
        return atleta
    } catch (error) {
        return error
    }
}

