const repository = require('../repositories/exames')


exports.getBusca =  async (req, res) => {
    const css = ['exames/eventos_ano.css']
    const js = [{ type: 'text/javascript', name: 'exames/lista.js' }]
    const eventos = await repository.getUltimos()
    res.render('exames/eventos_ano', { css: css, js: js, eventos: eventos} )
}

exports.listaEventosAno = async (req, res) => {
    const ano = req.params.ano
    const eventos = await repository.getListaEventos(ano)
    res.send(eventos)
}
   

exports.getAta = async (req, res) => {
    const ata = await repository.getAta(req.params.codevento)  
    const css = ['exames/ata.css']  
    const js = [
        { type: 'text/javascript', name: 'exames/ata.js'}
    ]
    const calendario = await repository.getCalendario(req.params.codevento)

    res.render('exames/ata', { 
        css: css, 
        js: js,
        calendario: calendario,
        ata: ata
    })
}

exports.getAdicionarAtletas = async (req, res) => {
    
    const evento = await repository.getCalendario(req.params.codevento)
    const atividades = await repository.getAtividades()
    const css = ['exames/adicionaratletas.css']
    const js = [ {
        type: 'text/javascript', name: 'exames/adicionarAtletas.js'
    }]
    res.render('exames/adicionaratletas', { css:css, js: js, evento: evento, atividades: atividades })
} 

exports.post = async (req, res) => {
    let codevento = req.body.codevento
    try {
        await repository.post(req.body)
        req.flash('success_msg','Atleta registrado com sucesso na ata.')
        
        res.redirect('/exames/ata/'+codevento)
    } catch(e) {
        req.flash('error_msg', 'Houve falha ao registrar ata: '+e)
        res.redirect('/exames')
    }
}

exports.getAtividadesPorTipo =  async(req, res) => {
    const atividades = await repository.getAtividadesPorTipo(req.params.tipoativ)
    res.send(atividades)
}

exports.delete = async (req, res) => {
    try {
        await repository.delete(req.body.codevento)
        req.flash('success_msg','Registro deletado com sucesso.')
        res.redirect('/exames/ata/'+codevento)
    
    } catch(e) {
        req.flash('error_msg','Falha ao tentar deletar o registro:' + e)
        res.redirect('/exames/ata/'+codevento)
    }

}

exports.editar = async(req, res) => {
    const codevento = req.params.codevento
    const codatleta = req.params.codatleta
    const codativ = req.params.codativ

    const css = ['exames/editar.css']
    const js = [ {
        type: 'text/javascript', name: 'exames/editar.js'
    }]
    const tipos = ['Competição','Cursos/Cargos','Arbitragem']
    try {
        const ata = await repository.getRegistroAta(codevento, codatleta, codativ)  
        const atividades = await repository.getAtividades()
        ata.tipos = ['Competição','Cursos/Cargos','Arbitragem']
        ata.atividades = atividades

        res.render('exames/editar', { 
            css: css, 
            js: js, 
            ata: ata
        })
    } catch (error) {
        
    }
}