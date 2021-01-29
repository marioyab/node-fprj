const Ata = require('../models/Ata')
const Calendario = require('../models/Calendario')
const Atleta = require('../models/Atleta')
const Atividade = require('../models/Atividade')
const { Op } = require('sequelize')

exports.getUltimos = async() => {
    const calendarios = await Calendario.findAll( {
        limit: 10,
        order: [ ['dataevento','DESC'] ]
    })
    return calendarios
}
exports.getListaEventos = async (ano) => {
    let datainicial = ano + '-01-01'
    let datafinal = ano + '-12-31'
    const calendarios = await Calendario.findAll( {
        where: {
            dataevento: {
                [ Op.gt ]: datainicial,
                [ Op.lt ]: datafinal
            }
        },
        order: [['dataevento','DESC']]
    })
    return calendarios
}
exports.getCalendario = async (codevento) => {
    const calendario = await Calendario.findAll({
        where: {
            codevento: codevento
        }
    })
    return calendario
}
exports.getAta = async (codevento) => {
    const atas = await Ata.findAll( {
        where: {
            codevento: codevento
        },
        include: [ 
            { model: Atleta },
            { model: Atividade}]
    })    
    return atas
}

exports.getRegistroAta = async (codevento, codatleta, codativ) => {
    
    const ata = await Ata.findAll( {
        where: {
            [Op.and]: {
                codevento: codevento,
                codcand: codatleta,
                codativ: codativ
            }
        },
        include: [
            { model: Atleta, attributes: ['codigo','nome']},
            { model: Calendario },
            { model: Atividade, attributes: ['codativ','descricao','tipo']}
        ]
    })
    return ata
}
exports.getEvento = async (codevento) => {
    const evento = await Calendario.findByPk(codevento)
    return evento
} 

exports.getAtividades = async() => {
    const atividades  = await Atividade.findAll({
        order: ['descricao']
    })
    return atividades
}

exports.getAtleta = async (codatleta) => {
    const atleta = await Atleta.findByPk(codatleta)
    return atleta
}

exports.getAtividade = async (codativ) => {
    const atividade = await Atividade.findByPk(codativ)
    return atividade
}
exports.post = async (registro) => {
    let erros = []
    if(!registro.codcand || registro.codcand == 0) {
        erros.push({texto: 'Código do atleta é obrigatório.'})
    } 
    if( registro.codativ == null) {
        erros.push({texto: 'Definir a atividade exercida.'})
    }
    if(registro.pto == null || registro.pto < 0) {
        erros.push({texto: 'Definir a pontuação.'})
    }
    if(registro.percentual < 0 || registro.percentual > 100) {
        erros.push({texto: "Percentual deve ser um número entre 0 e 100."})
    }
    if(erros.lenght > 0) {
        req.flash('error_msg', erros)
        res.redirect('exames/ata/adicionarAtletas/'+registro.codevento)
    }else {
        let ano = new Date().getFullYear()
        let novo = {
            codcand: registro.codcand,
            codevento: registro.codevento,
            codativ: registro.codativ,
            pto: registro.pto,
            tipoativ: registro.tipoativ,
            pto_computado: "N",
            percentual: registro.percentual,
            id_faixa: registro.id_faixa,
            ano: ano,
            obs: registro.obs
        }
        try {
            await Ata.create(novo)
        } catch(e) {
            return e
        }
    }
}

exports.getAtividadesPorTipo =  async(tipoativ) => {
    let atividades = await Atividade.findAll( {
        where: {
            tipo: tipoativ
        }, 
        order: ['descricao']
    })
    return atividades
}

exports.delete = async (codevento) => {
    await Ata.destroy( {
            where: {
                id: codevento
            }
        })
}
 
exports.inserirAtleta = async (codevento, data) => {
    await Ata.create()
}