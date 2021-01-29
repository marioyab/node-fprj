const Mensalidade = require('../models/Mensalidade')
const Academia = require('../models/Academia')
const { Op } = require('sequelize')


exports.get = async (ano) => {
    if (!ano) {
        ano = new Date().getFullYear()
    }
    console.log(ano)
    const res = await Mensalidade.findAll({
        where: {
            ano: ano
        },
        include: {
            model: Academia
        }
    })
    return res
}

exports.getMes = async (id_academia, ano) => {
    try {
        const res = await Mensalidade.findOne({
            where: {
                [Op.and]: {
                    id_academia: id_academia,
                    ano: ano
                }
            }
        })
        return res.json()
    } catch (error) {
        return error
    }
}


exports.salvar = async (registro) => {
    let id_academia = registro.id_academia
    let ano = registro.ano
    
    try {
        const res = await Mensalidade.update(registro, { 
            where: {
                [Op.and]: {
                    id_academia: id_academia,
                    ano: ano
                }
            }
        })
        return 0
    } catch (error) {
        return error
    }
}

exports.adicionar = async (registro) => {
    try {
        const res = await Mensalidade.create(registro)
        return res
    } catch (error) {
        return error
    }
}