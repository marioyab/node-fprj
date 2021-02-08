const repository = require('../repositories/atletas')
const repositoryFaixas = require('../repositories/faixas')
const repCarteirinhas = require('../repositories/repCarteirinha')


exports.pagBusca = async (req, res, next) => {

    const css = ["atletas/busca.css"]
    const carteirinhas = await repCarteirinhas.get()
    res.render('atletas/busca', { 
        js: [{ type: 'text/javascript', name: "atletas/busca.js"}],
        css: css,
        carteirinhas: carteirinhas })
}

exports.getBusca = async (req, res) => {
    let str = req.params.nome.toUpperCase()

        try {
            const atletas = await repository.getBusca(str)
            res.send(atletas)
        } catch (e) {
            req.flash('error_msg','Nenhum registro coincidente.')
            res.redirect('/atletas')
        }
    
}

exports.getCadastro = async (req, res) => {
    const faixas = await repositoryFaixas.getFaixas()
    const css = ['atletas/cadastro.css']
    const js = [ {
        type: 'module', name: 'atletas/cadastro.js'
    }]
    res.render('atletas/cadastro', { css: css, js: js, faixas: faixas })
}

exports.getByCodigo = async (req, res) => {
    let codigo = req.params.codigo
    try {
        
        const atleta = await repository.getByCodigo(codigo)
        
        if (atleta) {
            res.status(200).send(atleta)
        } else {
            res.status(201).send('Não encontrado')
        }
        res.send(atleta)
    } catch (e) {
        res.status(201).send('Não encontrado. ' + e)
    }
}

exports.getByNome = async (req, res) => {
    let nome = req.params.nome.toUpperCase()
    try {
        const atletas = await Atleta.findAll({
            where: {
                nome: {
                    [Op.substring]: nome
                }
            },
            order: ['nome']
        })
        res.send(atletas)
    } catch (e) {
        res.status(201).send('Não encontrado.')
    }
}

exports.editar = async (req, res) => {
    const faixas = await repositoryFaixas.getFaixas()
    const atleta = await repository.getEditar(req.params.codigo)
    const css = ["atletas/edicao.css"]
    const js = [
        { type: "module", name: "atletas/edicao.js"}
    ]
    res.render('atletas/edicao', {
        css: css,
        js: js,
        atleta: atleta,
        faixas: faixas })
}

