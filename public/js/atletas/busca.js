const searchWrapper = document.querySelector('.search-input')
const inputBox = document.querySelector('.search-txt')
const suggBox = document.querySelector('.autocom-box')

function ListaTemplate({codigo, nome, foto}) {
    return `
       <li>
        <a href="atletas/editar/${codigo}">  
        <img class="foto" src="/Fotos/${foto}" alt="${foto}"/>
        <p class="codigo">${codigo} <span>${nome}</span></p></a>
      </li>
    `

}

const limparPesquisa = () => {
    inputBox.value = ''
    searchWrapper.classList.remove('active') 
}
inputBox.onkeyup = async (event) => {
    let nome = event.target.value
    if(!nome) {
        limparPesquisa()
        return
    }
    if(nome.length > 3) {
        let url
        if (isNaN(nome)) {
            url = new URL("atletas/buscar/" + nome, window.location.origin)        
        } else {
            url = new URL("atletas/codigo/" + nome, window.location.origin)
        }
        const response = await fetch(url, { method: 'GET', Cors: 'no-cors' })
        const atletas = await response.json()
        if (atletas.length > 1) {
            // resultado.classList.remove('escondido')
            suggBox.innerHTML = `     
                ${atletas.map(ListaTemplate).join('')}
            `
            searchWrapper.classList.add('active')
        } else if (atletas.length == 0) {
            limparPesquisa()
            alert('Nenhum resultado encontrado.')
        } else {
            window.location.href(`"atletas/editar/${nome}"`)
        } 
    }
}

document.addEventListener("DOMContentLoaded", event => {
    event.preventDefault()
    limparPesquisa()
})

