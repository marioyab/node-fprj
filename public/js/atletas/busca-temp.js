const txtBusca = document.querySelector('.search-txt')
const resultado = document.querySelector('.resultado')

function ListaTemplate(atleta) {
    return `
      <div class="item">  
        <a href="atletas/editar/${atleta.codigo}">  
        <p class="codigo">${atleta.codigo} <span>${atleta.nome}</span></p>
        <p class="academia">${atleta.academia.razao}</p></a> 
      </div>
    `

}
txtBusca.addEventListener('keydown', async (e) => {
    if (e.keyCode == 13) {
        
        let nome = e.target.value
        const url = new URL("atletas/buscar/" + nome, window.location.origin)        

        const response = await fetch(url, { method: 'GET', Cors: 'no-cors' })

        const atletas = await response.json()
        console.log(atletas)
        if (atletas) {
            resultado.classList.remove('escondido')
            resultado.innerHTML = `     
                ${atletas.map(ListaTemplate).join('')}
                </table>
            `
        } else {
            alert('Nenhum resultado encontrado.')
        }
    }
})

// document.addEventListener('DOMContentLoaded', async() => {
document.addEventListener('keyup', event => {
    if (event.keyCode === 27) {
        txtBusca.value = ''
        resultado.classList.add('escondido')
    }
})