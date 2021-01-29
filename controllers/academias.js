// GET     busca  -> /busca/:nome  -> academias/lista.handlebars 
// GET     /cadastro/nova -> academias/nova -> /inserir 
// GET     /editar/:codigo  -> getEditarCodigo -> academias/edicao
// DELETE  /

const repository = require('../repositories/academias')
const delegacia_repository = require('../repositories/delegacias')
// const { RemoveMascara } = require('./../public/js/utils')

// -------------------------------------------------------------- Rota renderizada  ---//
exports.get = async (req, res, next) => {
    try {
        const academias = await repository.get()
        const css = ['academias/lista.css']
        const js = [ 
            { type: 'text/javascript', name: 'tabela.js'},
            { type: 'module', name: 'academias/lista.js'},
            { type: 'text/javascript', name: 'academias/LocalizarAcademia.js'}]
        res.render('academias/lista', { css: css, js: js, academias: academias}) 
    } catch (e) {
        req.flash('error_msg','Falha na requisição')
        res.redirect('/')
    }
}

exports.getBusca = async (req, res, next) => {
    let nome = req.params.nome.toUpperCase()
    try {
        const academias = await repository.getByNome(nome)
        res.render("academias/lista", { academias: academias })
    } catch (error) {
        req.flash('error_msg','Nenhuma academia coincidente.')
        res.redirect('academias')
    }
}

// -------------------------------------------------------------- Rota renderizada  ---//
exports.getEditar = async (req, res, next) => {
    const css = ['academias/edicao.css']
    const js = [ 
        { type: 'module', name: 'academias/edicao.js'},
        { type: 'text/javascript', name: 'mascara.min.js'}]
       
    const delegacias = await delegacia_repository.get()
    try {
        const academia = await repository.getEditar(req.params.codigo)
        res.render("academias/edicao", {
            css: css,
            js: js,
            academia: academia,
            delegacias: delegacias
        })
    } catch (error) {
        req.flash("error_msg", 'Falha na requisição');
        res.redirect('/')
    }
}

// ------------------------------------------------------------ Rota Não-renderizada  ---//
exports.getByCodigo = async (req, res, next) => {
    try {
        const academia = await repository.getByCodigo(req.params.codigo)
        res.send(academia)
    } catch (error) {
        res.status(500).send({
            message: 'Falha na requisição'
        })
    }
}

// ------------------------------------------------------------ Rota Não-renderizada  ---//
exports.getByNome = async (req, res, next) => {
    let nome = req.params.nome.toUpperCase()
    try {
        const academias = await repository.getByNome(nome)
        res.send(academias)
    } catch (error) {
        res.send(error)
    }
}

// ------------------------------------------------------------ Rota Não-renderizada  ---//
exports.nova = async (req, res) => {
    const css = ['academias/cadastro.css']
    const js = [ 
        {type: 'text/javascript', name: 'mascara.min.js'},
        { type: 'module', name: 'academias/cadastro.js'}]

    const delegacias = await delegacia_repository.get()
    res.render('academias/cadastro', { 
        css: css,
        js: js,
        delegacias: delegacias })
}


// ------------------------------------------------------------------- Rota renderizada  ---//
exports.inserir = async (req, res, next) => {
    let delegacia = (req.body.id_delegacia ? req.body.id_delegacia : 0)
    // let dt = ""
    // // if (req.body.dtcadastro) {
    //     dt = req.body.dtcadastro.split('/')
    // }
    
    // if (!dt || dt == '') {
    //     let data = new Date()
    //     let dia = data.getDate()
    //     let mes = data.getMonth() + 1
    //     dt = [(dia < 10?'0'+dia:dia),(mes < 10?'0'+mes:mes), data.getFullYear()]
    // } 

    // req.body.dtcadastro = dt[2] + '-' + dt[1] + '-' + dt[0]
    if(!req.body.dtcadastro) {
        req.body.dtcadastro = new Date().toDateString()
    }
    if(!req.body.tipofiliacao) {
        req.body.tipofiliacao = '2'
    }
    req.body.id_delegacia = delegacia
    req.body.cep = RemoveMascara(req.body.cep)
    req.body.cnpj = RemoveMascara(req.body.cnpj)
   
    const nova = req.body
    try {
        const resultado = await repository.adicionar(nova)
        req.flash('success_msg', 'Academia incluida com sucesso. '+resultado)
        res.redirect('/academias')
    } catch (error) {
        req.flash('error_msg', error)
        res.redirect('/academias')
    }
}

function RemoveMascara(valor) {
    return valor.replace(/[.\/-]/g,'')
}
// ------------------------------------------------------------------ Rota renderizada  ---//
exports.salvar = async (req, res, next) => {
//    let dt = req.body.dtcadastro.split('/')
    
    // if (!dt || dt == '') {
    //     let data = new Date()
    //     let dia = data.getDate()
    //     let mes = data.getMonth() + 1
    //     dt = [(dia < 10?'0'+dia:dia),(mes < 10?'0'+mes:mes), data.getFullYear()]
    // } 

    // req.body.dtcadastro = dt[2] + '-' + dt[1] + '-' + dt[0]
    if(!req.body.dtcadastro) {
        req.body.dtcadastro = new Date().toDateString()
    }
    if(!req.body.tipofiliacao) {
        req.body.tipofiliacao = '2'
    }
    req.body.cep = RemoveMascara(req.body.cep)
    req.body.cnpj = RemoveMascara(req.body.cnpj)
    try {
        const result = await repository.salvar(req.params.codigo, req.body)
        req.flash('success_msg', req.body.razao+' alterada com sucesso. ')
        res.redirect('/academias')
    } catch (error) {
        req.flash('error_msg', error)
        res.redirect('/academias')
    } 
}

// ------------------------------------------------------------------ Rota renderizada  ---//
exports.desativar = async (req, res, next) => {
    let codigo = req.params.codigo
    req.body.tipofiliacao = 0
    try {
        await repository.salvar(req.params.codigo, req.body)
        req.flash('success_msg', 'Academia excluida com sucesso.')
        res.redirect('/academias')
    } catch (error) {
        req.flash('error_msg', 'Falha na exclusao da academia: ' + error)
        res.redirect('/academias')
    }
}
