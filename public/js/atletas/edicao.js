import { cepController } from '/js/cepController.js'

// document.getElementById('sexo').value = `{{ atleta.sexo }}`
// document.getElementById('tiporegistro').value = {{ atleta.tiporegistro }}
// document.getElementById('id_faixa').value = {{ atleta.id_faixa }}
// document.getElementById('estadocivil').value = `{{atleta.estadocivil}}`

const IdAcademia = document.getElementById('id_academia')
const cep = document.getElementById('cep')
const endereco = document.getElementById('endereco') 
const numero = document.getElementById('numero')
const complemento = document.getElementById('complemento') 
const bairro = document.getElementById('bairro') 
const cidade = document.getElementById('cidade') 
const uf = document.getElementById('estado')
const nome = document.getElementById('nome')
const nome_carteirinha = document.getElementById('nome_cart')

IdAcademia.addEventListener('blur', async (e) => {
    let codigo = e.target.value
    const url = new URL("academias/" + codigo, window.location.origin)
    try {
        const response = await fetch(url, { method: 'get' })
        const academia = await response.json()
        document.querySelector('.razao').innerHTML = `<span class="academia">${academia.razao}</span>`
    } catch {
        alert('Código não cadastrado.')
        document.querySelector('.razao').innerHTML = `<span></span>`
    }
})

const buscaCep = new cepController(cep, endereco, numero, complemento, bairro, cidade, uf)

if(nome.value.length > 27) {
        
    nome_carteirinha.classList.add('esconder')
} else {
    nome_carteirinha.classList.remove('esconder')
}

nome.addEventListener('blur', event => {
    
    if(nome.value.length > 27) {
        
        nome_carteirinha.classList.add('esconder')
    } else {
        console.log('entrou aqyu')
        nome_carteirinha.classList.remove('esconder')
    }

})
