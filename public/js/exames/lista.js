const resultado = document.querySelector('.resultado')
const inputBox = document.querySelector('#ano')


let data
function ListaTemplate(evento) {
    data = evento.dataevento.split('-')
    data = data[2] + '/' + data[1]
    return `
       <li>
            <a href="exames/ata/${evento.codevento}">  
            <p class="data">${data}</p>
            <p class="descricao"> <span>${evento.descricao}</span></p>
            <p class="local"q>${evento.local}</p></a>
      </li>
    `
}

const limparPesquisa = () => {
    if(inputBox.value == '') { 
        inputBox.value = new Date().getFullYear()
    }
    resultado.classList.remove('active') 
}

inputBox.onkeyup = async (event) => {
    let ano = event.target.value
    if(!ano) {
        limparPesquisa()
        return
    }
    if(ano.length == 4) {
        let url = new URL("exames/ano/" + ano, window.location.origin)
        const response = await fetch(url, { method: 'GET', Cors: 'no-cors' })
        const eventos = await response.json()
        if (eventos.length > 1) {
            // resultado.classList.remove('escondido')
            resultado.innerHTML = `     
                <ul>
                ${eventos.map(ListaTemplate).join('')}
                </ul>
            `
            resultado.classList.add('active')
        } else if (eventos.length == 0) {
            limparPesquisa()
            alert('Nenhum resultado encontrado.')
        } else {
            window.location.href(`"exames/ata/${ano}"`)
        } 
    }
}

document.addEventListener("DOMContentLoaded", event => {
    event.preventDefault()
    limparPesquisa()
})



