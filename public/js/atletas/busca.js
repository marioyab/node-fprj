const resultado = document.querySelector('.resultado')
const inputBox = document.querySelector('#txt-busca')

function ListaTemplate({codigo, nome, foto}) {
   resultado.innerHTML = `
    <li><img src="${foto}">
      ${codigo} ${nome}}</li>
   `
}

const limparPesquisa = () => {
    inputBox.value = ''         
    resultado.classList.remove('active') 
}

const buscarPorNome = (nome) => new URL("atletas/buscar/" + nome, window.location.origin)
const buscarPorCodigo = (codigo) => new URL("atletas/codigo/" + codigo, window.location.origin)


inputBox.onkeyup = async (event) => {
    let parametro = event.target.value
    if(!parametro) {
        limparPesquisa()
        return
    }
    if(parametro.length > 3) {
        let url = (isNaN(parametro)) 
            ? buscarPorNome(parametro)
            : buscarPorCodigo(parametro)

        const response = await fetch(url)
        const atletas = await response.json()
        
        newFunction()           
        
        if (atletas.length > 1) {
            resultado.innerHTML = `
                <ul>
                    ${atletas.map(atleta => {
                        return ` 
                        <li>
                            <div>
                                <span>${atleta.codigo}</span> - ${atleta.nome}<br>
                                ${atleta.faixa.nome}<br>
                                ${atleta.tipoDesc}</br>
                                <p class="academia">${atleta.academia.razao}</p>
                            </div>
                            <img src="/Fotos/${atleta.foto}" width="70" height="100">
                        </li>
                        `
                    }).join('')}
                </ul>`
        } else if (atletas.length == 0) {
            limparPesquisa()
            alert('Nenhum resultado encontrado.')
        } else {
            window.location.href(`"atletas/editar/${parametro}"`)
        } 
    }
}

document.addEventListener("DOMContentLoaded", event => {
    event.preventDefault()
    limparPesquisa()
    inputBox.focus()
})

function newFunction() {
    resultado.classList.add('active')
}

