const Faixa = require('../models/Faixa') 

exports.getFaixas = async () => {
    try {
        const faixas = await Faixa.findAll({
            order: ['seq']
        })
        return faixas
    } catch (err) {
        return err
    }
}