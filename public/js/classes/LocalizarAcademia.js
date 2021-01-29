class Localizar {
    constructor(tabela, btnLimpar, txtBusca) {
        this.tabela = document.getElementById(tabela)
        this.btnLimpar = document.getElementById(btnLimpar)
        this.txtBusca = document.getElementById(txtBusca)
        this.onLimpar()
        this.EsconderBtnLimpar()
    }
    
    limparBusca() {
        let tr, i;
        tr = this.tabela.getElementsByTagName("tr");
        for (i = 1; i < tr.length; i++) {
            this.tabela.rows[i].style.display = ""
        }
    }

    onLimpar() {
        this.btnLimpar.addEventListener('click', e => {
            this.EsconderBtnLimpar()
            this.limparBusca()
            this.txtBusca.value = ''
            this.txtBusca.focus()
        })
    }
    onPesquisar() {
        this.txtBusca.addEventListener('keyup', e => {
            let txt = e.target.value
            if (txt.length > 0) {
                this.MostrarBtnLimpar();
                this.ProcessarBusca(txt)
            }
        })
    }
    MostrarBtnLimpar() {
        this.btnLimpar.style.display = ''
    }

    EsconderBtnLimpar() {
        this.btnLimpar.style.display = 'none'
    }

    ProcessarBusca(txt) {
        let  tr, td, i;
        tr = this.tabela.getElementsByTagName("tr");
        
        for (i = 1; i < tr.length; i++) {
            td = this.tabela.rows[i].childNodes
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
                this.tabela.rows[i].style.display = ""
            } else {
                this.tabela.rows[i].style.display = "none"
            }  
        }
    }

}