const table = document.getElementById("tabela");
const txtBusca = document.getElementById('txtBusca')
const btnLimpar = document.getElementById('limpar')
 const tr = table.getElementsByTagName("tr");

const DisplayBtnLimpar = (flag) => btnLimpar.style.display = flag?"block":"none"

const limparBusca = () => {
    let i;
    for (i = 1; i < tr.length; i++) {
        table.rows[i].style.display = ""
    }
}

function ProcessarBusca(txt) {
    let td, i;
    for (i = 1; i < tr.length; i++) {
        td = table.rows[i].childNodes
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
            table.rows[i].style.display = ""
        } else {
            table.rows[i].style.display = "none"
        }  
    }
}

    
btnLimpar.addEventListener('click', event => {
    DisplayBtnLimpar(false)
    limparBusca()
    txtBusca.value = ''
    txtBusca.focus()
})

txtBusca.addEventListener('keyup', event => {
    DisplayBtnLimpar(true);
    let txt = event.target.value
    if (txt.length > 0) {
        ProcessarBusca(txt)
    }
})

