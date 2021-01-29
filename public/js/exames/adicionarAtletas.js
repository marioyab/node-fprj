const codAtleta = document.getElementById('codcand') 
const nome = document.getElementById('nome')
const idFaixa = document.getElementById('id_faixa')
const tipos = document.getElementById('tipoativ')
const btnSalvar = document.getElementById('btnSalvar')
// const formulario = document.getElementById('formulario')

async function CarregaAtividades(tipo) {
    const url = new URL('/exames/atividades/tipo/' + tipo, window.location.origin)

    let resultado = await fetch(url, {method: 'get', mode: 'cors'})
    let atividades = await resultado.json()

    let selects = document.getElementById('codativ')
    selects.textContent = ''
    atividades.forEach( function(atividade) {
        let opt = document.createElement('option')
        opt.value = atividade.codativ
        opt.textContent = atividade.descricao
        selects.appendChild(opt)
    })

}

CarregaAtividades(tipos.value)

tipos.addEventListener('change', async (e) => {
    e.preventDefault()
    let tipo = e.target.value
    // localStorage.setItem('tipos', tipo)
    CarregaAtividades(tipo)
})


codAtleta.addEventListener('blur', async (e) => {
    e.preventDefault()
    const url = new URL('/atletas/codigo/'+codAtleta.value, window.location.origin)
    let resultado = await fetch(url, { method: 'get', mode: 'cors'})
    if (resultado.status == 200) {
        let atleta = await resultado.json()
        nome.value = atleta.nome
        idFaixa.value = atleta.id_faixa
    } else {
        alert('Código não cadastrado.')
        codAtleta.focus()
    }
})

function converteFD2json(formdata) {
    let obj = {}
    for (let key of formdata.keys()) {
        obj[key] = formdata.get(key)
    }
    return obj
}
// formulario.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     const formData = new FormData(e.target)
//     fd = await converteFD2json(formData)
//     console.log('FORMDATA=',fd)
//     let h = new Headers()
//     h.append('Content-type', 'application/json')
//     const url = new URL('exames/ata/inserirAtleta', window.location.origin)
//     await fetch(url, { 
//         method: 'post', 
//         headers: h,
//         body: fd,
//         mode: 'cors',
//     }).then( response => {
//         return response.text()
//     }).then( text => {
//         console.log(text)
//     }).catch(error => {
//         console.log(error)
//     })
// })