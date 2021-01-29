const Academia = require('../models/Academia')
const Delegacia = require('../models/Delegacia')
const { Op } = require('sequelize')

exports.get = async () => {
    try {
        const res = await Academia.findAll({
            order: ['razao']
        })
        return res
    } catch (err) {
        return err
    }
}

exports.getEditar = async (codigo) => {
    try {
        const res = await Academia.findByPk(codigo)
        return res   
    } catch (error) {
        return error
    }
}

exports.getByCodigo = async (codigo) => {
   
    try {
        const res = await Academia.findByPk(codigo)
        return res
    } catch (error) {
        return error
    }
}

exports.getBusca = async (nome) => {
    try {
        const res = await Academia.findAll({ 
            where: { 
                razao: {
                    [Op.substring]: nome
                }
            },
            order: ['razao']
        })
        return res
    } catch (error) {
        return error
    }
}

exports.getByNome = async (nome) => {
    try {
        const res = await Academia.findAll({ 
            where: { 
                razao: { 
                    [ Op.substring ]: nome
                }
            },
            order: ['razao']
        })
        return res
    } catch (error) {
        return error
    }
}

exports.adicionar = async (nova) => {
    try {
        const res = await Academia.create(nova)
        return res
    } catch (error) {
        return error
    }
}

exports.salvar = async (codigo, registro) => {
    try {
        const result = await Academia.update( registro, {
            where: {
                codigo: codigo
            }
        })
        console.log(result)
        return result
      } catch (err) {
          console.log('Erro=',err)
        return err
      }
      
}

exports.delete = async (codigo) => {
    try {
        const res = await Academia.delete(codigo)
        return res
    } catch (error) {
        return error
    }
}