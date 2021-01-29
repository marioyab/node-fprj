const Sequelize = require('sequelize')
const { Op } = require('sequelize')

const sequelize = new Sequelize('federacao', 'mario', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    },
    timezone: '-03:00'
})

const M_Old = sequelize.define('mensalidades_old', {
    codacad: {
        type: Sequelize.INTEGER
    },
    ano: {
        type: Sequelize.SMALLINT
    }, 
    mes: { type: Sequelize.SMALLINT },
    dataemissao: {
        type: Sequelize.DATE
        },
    recnro: {
        type: Sequelize.STRING
    },
    valormensal: {
        type: Sequelize.DECIMAL
    },
    tipofiliacao: {
        type: Sequelize.SMALLINT
    }
}, {
    freezeTableName: true
})

M_Old.removeAttribute('id')

const Mensalidades = sequelize.define('mensalidades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_academia: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ano: {
        type: Sequelize.SMALLINT
    },
    pago01: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor01: {
        type: Sequelize.STRING
    },
    pago02: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor02: {
        type: Sequelize.STRING
    },
    pago03: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor03: {
        type: Sequelize.STRING
    },
    pago04: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor04: {
        type: Sequelize.STRING
    },
    pago05: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor05: {
        type: Sequelize.STRING
    },
    pago06: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor06: {
        type: Sequelize.STRING
    },
    pago07: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor07: {
        type: Sequelize.STRING
    },
    pago08: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor08: {
        type: Sequelize.STRING
    },
    pago09: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor09: {
        type: Sequelize.STRING
    },
    pago10: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor10: {
        type: Sequelize.STRING
    },
    pago11: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor11: {
        type: Sequelize.STRING
    },
    pago12: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    valor12: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})


async function alterar(id_academia, ano, mes, recnro) {
    let registro
    switch (mes) {
        case 1:
            registro = { pago01: true, valor01: recnro }
            break;
        case 2:
            registro = { pago02: true, valor02: recnro }
            break;
        case 3:
            registro = { pago03: true, valor03: recnro }
            break;
        case 4:
            registro = { pago04: true, valor04: recnro }
            break;
        case 5:
            registro = { pago05: true, valor05: recnro }
            break;
        case 6:
            registro = { pago06: true, valor06: recnro }
            break;
        case 7:
            registro = { pago07: true, valor07: recnro }
            break;
        case 8:
            registro = { pago08: true, valor08: recnro }
            break;
        case 9:
            registro = { pago09: true, valor09: recnro }
            break;
        case 10:
            registro = { pago10: true, valor10: recnro }
            break;
        case 11:
            registro = { pago11: true, valor11: recnro }
            break;
        case 12:
            registro = { pago12: true, valor12: recnro }
            break;
        }
    try {
        await Mensalidades.update(registro, {
            where: {
                [Op.and]: {
                    id_academia: id_academia,
                    ano: ano
                }
            }
        })
    } catch (error) {
        console.error('Erro alterando: ' + error)
    }
}

async function inserir(id_academia, ano, mes, recnro) {
    registro = {
        "id_academia": id_academia,
        "ano": ano,
        "pago01": mes == 1, "valor01": (mes == 1 ? recnro : ''),
        "pago02": mes == 2, "valor02": (mes == 2 ? recnro : ''),
        "pago03": mes == 3, "valor03": (mes == 3 ? recnro : ''),
        "pago04": mes == 4, "valor04": (mes == 4 ? recnro : ''),
        "pago05": mes == 5, "valor05": (mes == 5 ? recnro : ''),
        "pago06": mes == 6, "valor06": (mes == 6 ? recnro : ''),
        "pago07": mes == 7, "valor07": (mes == 7 ? recnro : ''),
        "pago08": mes == 8, "valor08": (mes == 8 ? recnro : ''),
        "pago09": mes == 9, "valor09": (mes == 9 ? recnro : ''),
        "pago10": mes == 10, "valor10": (mes == 10 ? recnro : ''),
        "pago11": mes == 11, "valor11": (mes == 11 ? recnro : ''),
        "pago12": mes == 12, "valor12": (mes == 12 ? recnro : '')
    }
    
    try {
        await Mensalidades.create(registro)
        
    } catch (err) {
        return console.error('Erro inserindo: ' + err + ' ' + registro.id_academia)
    }
}

async function existe(id_academia, ano) {
    try {
        const m = await Mensalidades.findAll({
            where: {
                [Op.and]: {
                    id_academia: id_academia,
                    ano: ano
                }
            }
        })
        return (m.length > 0)
    } catch (err) {
        return false
    }
}

async function atualiza(res) {
    for (const row of res) {
        let id_academia = row.codacad
        let ano = row.ano
        let mes = row.mes
        let recnro = row.recnro

        const achou = await existe(id_academia, ano)
        if (achou) {    
            const ok = await alterar(id_academia, ano, mes, recnro)    
        } else {
            const res = await inserir(id_academia, ano, mes, recnro)
        }
   }
}

async function LerTodos() {
    try {
        const res = await M_Old.findAll({
            order: ['codacad', 'ano', 'mes']
        })
        atualiza(res)

    } catch (err) {
        console.error(err)
        return err
    }
}


LerTodos()

