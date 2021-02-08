import { cepController } from '/js/cepController.js'

const cep = document.getElementById('cep')
const endereco = document.getElementById('endereco')
const numero = document.getElementById('numero')
const complemento = document.getElementById('complemento')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')

document.getElementById('id_academia').addEventListener('blur', async (e) => {
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

const modalAcademia = document.querySelector('.modal-container')
// document.querySelector('#cep').addEventListener('blur', e => {
//     modalAcademia.classList.add('mostrar')

// })

document.querySelector('.fechar').addEventListener('click', e => {
    modalAcademia.classList.remove('mostrar')
})


const cepctrl = new cepController(cep, endereco, numero, complemento, bairro, cidade, uf)