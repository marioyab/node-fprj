const Carteirinha = require('../models/Carteirinha')
const Atleta = require('../models/Atleta')

exports.get = async () => {
    try {
       const resp = await Carteirinha.findAll({
           where: {
               impresso: false
           },
           include: [{
               model: Atleta,
               attributes: [ 'codigo','nome']
           }]
       })
       return resp
    } catch (error) {
        return error
    }
}