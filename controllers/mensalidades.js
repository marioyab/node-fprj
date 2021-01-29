const repository = require('../repositories/mensalidades')

// -------------------------------------------------------------- Rota renderizada  ---//
exports.get = async (req, res) => {
    try {
        const mensalidades = await repository.get(req.params.ano)
        res.render('mensalidades/lista', { mensalidades: mensalidades })
    } catch (err) {
        req.flash('error_msg', 'Erro ' + err)
        res.redirect('/')
    }
}

async function alterar(mes, recnro, mensal) {
    
   
    
    if (mes == 1) {
        mensal.pago01 = true,
        mensal.valor01 = recnro
    } else if (mes == 2) {
        mensal.pago02 = true,
        mensal.valor02 = recnro
    } else if (mes == 3) {
        mensal.pago03 = true,
        mensal.valor03 = recnro
    } else if (mes == 4) {
        mensal.pago04 = true,
        mensal.valor04 = recnro
        console.log(mensal)
    } else if (mes == 5) {
        mensal.pago05 = true,
        mensal.valor05 = recnro
    } else if (mes == 6) {
        mensal.pago06 = true,
        mensal.valor06 = recnro
    } else if (mes == 7) {
        mensal.pago07 = true,
        mensal.valor07 = recnro
    } else if (mes == 8) {
        mensal.pago08 = true,
        mensal.valor08 = recnro
    } else if (mes == 9) {
        mensal.pago09 = true,
        mensal.valor09 = recnro
    } else if (mes == 10) {
        mensal.pago10 = true,
        mensal.valor10 = recnro
    } else if (mes == 11) {
        mensal.pago11 = true,
        mensal.valor11 = recnro
    } else if (mes == 12) {
        mensal.pago12 = true,
        mensal.valor12 = recnro
    }
    try {
        const res = await repository.salvar(mensal)
        return 0
    } catch (error) {
        return error
    }
}

async function adicionar(id_academia, ano, mes, valor) {
    let registro = {
        id_academia: id_academia,
        ano: ano,
        pago01: (mes == 1 ? true : false),
        valor01: (mes == 1 ? valor : ''),
        pago02: (mes == 2 ? true : false),
        valor02: (mes == 2 ? valor : ''),
        pago03: (mes == 3 ? true: false),
        valor03: (mes == 3 ? valor : ''),
        pago04: (mes == 4 ? true: false),
        valor04: (mes == 4 ? valor : ''),
        pago05: (mes == 5 ? true: false),
        valor05: (mes == 5 ? valor : ''),
        pago06: (mes == 6 ? true: false),
        valor06: (mes == 6 ? valor : ''),
        pago07: (mes == 7 ? true: false),
        valor07: (mes == 7 ? valor : ''),
        pago08: (mes == 8 ? true: false),
        valor08: (mes == 8 ? valor : ''),
        pago09: (mes == 9 ? true: false),
        valor09: (mes == 9 ? valor : ''),
        pago10: (mes == 10 ? true: false),
        valor10: (mes == 10 ? valor : ''),
        pago11: (mes == 11 ? true: false),
        valor11: (mes == 11 ? valor : ''),
        pago12: (mes == 12 ? true: false),
        valor12: (mes == 12 ? valor : ''),
    }
    try {
        const res = await repository.adicionar(registro)
        return 0
    } catch (error) {
        return error
    }
}

exports.post = async (req, res, next) => {
    let ano = req.body.ano
    const mensal = await repository.getMes(req.body.id_academia, ano)
    try {
        if (mensal) {
            const res = await alterar(req.body.mes, req.body.valor, mensal)
        } else {
            const res = await adicionar(req.body.id_academia, ano, req.body.mes, req.body.valor)
        }    
        req.flash('success_msg', 'Sucesso')
        res.redirect('/mensalidades/'+ano)
    } catch(error) {
        req.flash('error_msg', 'Houve uma falha: '+error)
        res.redirect('/mensalidades/'+ano)
    }
}

exports.getMes = async (req, res) => {
    try {
        const mensalidades = await repository.getMes(req.params.id_academia, req.params.ano)
        res.send(mensalidades)
    } catch (err) {
        res.send(err)
    }
}