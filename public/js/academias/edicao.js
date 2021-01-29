import { formatar } from '../utils.js'
import { cepController } from '../cepController.js'

const cnpj = document.getElementById('cnpj')
const cep = document.getElementById('cep')
const endereco = document.getElementById('endereco')
const complemento = document.getElementById('complemento')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('estado')
const numero = document.getElementById('numero')

 document.addEventListener("DOMContentLoaded", event => {
     event.preventDefault()
    cnpj.value = formatar('##.###.###/####-##', cnpj.value)
    cep.value = formatar('##.###-###', cep.value)
})

new cepController(
    cep, endereco, numero, complemento, bairro, cidade, uf
)

