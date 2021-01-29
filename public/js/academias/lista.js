// import { Localizar } from './LocalizarAcademia.js'

const txtBusca = document.getElementById('txtBusca')
const btnLimpar = document.getElementById('limpar')
const filtrofiliacao = document.getElementById('filtro_tipofiliacao')
const btnInativar = document.querySelector('#btnInativar')
const table = document.getElementById("tabela");

const tr = table.getElementsByTagName("tr")
const displayLinha = (linha, flag) => linha.style.display = flag?"":"none"
const colTipoFiliacao = (td) => td[5].textContent

// const Busca = new Localizar(table, btnLimpar, txtBusca)

function filtrar(filter) {
    let td
     for (let i = 1; i < tr.length; i++) {
        td = tr[i].childNodes
        if (filter == 5) {
            displayLinha(tr[i], colTipoFiliacao(td) != 0)
        } else {
            displayLinha(tr[i], colTipoFiliacao(td) === filter)
        }
    }
}


// const LinhaTabela = (i) => table.rows[i]
// const ColunaTab = (td) => td[5].textContent.trim()
// const displayLinha = (i, flag) => LinhaTabela(i).style.display = flag?"":"none"

// function filtrar(filter) {
//     let tr, td, i
//     tr = table.getElementsByTagName("tr")
//     for (i = 1; i < tr.length; i++) {
//         td = LinhaTabela(i).childNodes
//         if (filter == 5) {
//             displayLinha(i, ColunaTab(td) != 0)
//         } else {
//             displayLinha(i, ColunaTab(td) === filter)
//         }
//     }
// }

function desativar(codigo) {
    if (window.confirm("Tem certeza que deseja desativar essa academia?" + codigo)) {
        let url = new URL("/academias/desativar/" + codigo, window.location.origin);
        fetch(url, { method: 'POST' })
    }
}

/*document.getElementById('btnMensalidade').addEventListener('click', e => {
    let ano = new Date().getFullYear()
    let url = new URL('/mensalidades/' + ano, window.location.origin)
    window.location.replace(url)
    
})*/

filtrofiliacao.addEventListener('change', event => filtrar(event.target.value))

// const DisplayBtnLimpar = (mostrar) => btnLimpar.style.display = mostrar?'block':'none'

// txtBusca.addEventListener('keyup', event => {
//     event.preventDefault()
//     DisplayBtnLimpar(true)
// })

// btnLimpar.addEventListener('click', event => {
//     event.preventDefault()
//     DisplayBtnLimpar(false)
//     txtBusca.value = ''   
// })

// btnInativar.addEventListener('click', e => {
//     alert('clicou aqui')
// })
