const Calendario =  require('../models/Calendario')
const { Op, Sequelize } = require('sequelize')

exports.get = async (req, res) => {
    const ano = req.params.ano
    const datainicial = (ano-1) + '-12-31'
    const datafinal = ano + '-12-31'

    const calendarios = await Calendario.findAll({
        where: {
            dataevento: {
                [Op.gt]: datainicial,
                [Op.lt]: datafinal
            }
        },
        order: [['dataevento','DESC']]
    })
    res.render('exames/eventos_ano', { calendarios: calendarios})
}