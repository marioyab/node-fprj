const Delegacia = require('../models/Delegacia')

exports.get = async () => {
    try {
        const res = Delegacia.findAll({ 
            order: ['nome']
        })
        return res   
    } catch (error) {
        return error
    }
}