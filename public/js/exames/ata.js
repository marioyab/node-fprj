const searchTxt = document.getElementById('search')
const tabela = document.querySelector(".tabela-ata");
const btnLimpar = document.getElementById('btnLimpar')
const tr = document.getElementsByTagName("tr");

const limparBusca = () => {
    DisplayBtnLimpar(false)
    let i;
    for (i = 1; i < tr.length; i++) {
        tabela.rows[i].style.display = ""
    }
}

function ProcessarBusca(txt) {
    let td, i;
    for (i = 1; i < tr.length; i++) {
        td = tabela.rows[i].childNodes
        let valor
        let achou = false
        
        if (isNaN(txt)) {
            valor = td[3].textContent.trim()
            achou = valor.includes(txt.toUpperCase()) 
        } else {
            valor = td[1].textContent.trim()
            
            achou = valor === txt
        }
        
        if (achou) {
            tabela.rows[i].style.display = ""
        } else {
            tabela.rows[i].style.display = "none"
        }  
    }
}

    
btnLimpar.addEventListener('click', event => {
    
    limparBusca()
    searchTxt.value = ''
    searchTxt.focus()
})

const DisplayBtnLimpar = (flag) => btnLimpar.style.display = flag?"inline-block":"none"

searchTxt.addEventListener('keyup', event => {
    DisplayBtnLimpar(true);

    let txt = event.target.value
    if (txt.length > 0) {
        ProcessarBusca(txt)
    }
})

