class Mensalidades {
    constructor(campo_ano) {
        this.campo_ano = document.getElementById(campo_ano)
        this.ano = this.campo_ano.value 
        if (!this.ano) {
            const url = window.location.href.split('/')[4]
            if (!url) {
                this.ano = new Date().getFullYear()
            } else {
                this.ano = url
            }
            this.campo_ano.value = this.ano
        }
        this.addEvento()
    }
    listar() {
        console.log(this.ano)
        let url = new URL('/mensalidades/' + this.ano, window.location.origin)
        window.location.replace(url)
        this.campo_ano.value = this.ano
    }
    recuperaMes(id_academia, mes) {
        let url = new URL('/mensalidades/' + id_academia + '/' + this.ano, window.location.origin)
        fetch(url, { method: 'GET' }).then(response => {
            if (!response.ok) {
              return new Error('falhou a requisição') // cairá no catch da promise
            }
            if (response.status === 404) {
              return new Error('não encontrou qualquer resultado')
            } 
            resp = response.json()
            console.log(resp)
            let pago
            let valor
            switch(mes) {
                case 1:
                    pago = resp.pago01
                    valor = resp.valor01
                    break;
                case 2: 
                    pago = resp.pago02
                    valor = resp.valor02
                    break
                case 3:
                    pago = resp.pago03
                    valor = resp.valor03
                    break;
                case 4: 
                    pago = resp.pago04
                    valor = resp.valor04
                break
                case 5:
                    pago = resp.pago05
                    valor = resp.valor05
                    break;
                case 6: 
                    pago = resp.pago06
                    valor = resp.valor06
                break
                case 7:
                    pago = resp.pago07
                    valor = resp.valor07
                    break;
                case 8: 
                    pago = resp.pago08
                    valor = resp.valor08
                break
                case 9:
                    pago = resp.pago09
                    valor = resp.valor09
                    break;
                case 10: 
                    pago = resp.pago10
                    valor = resp.valor10
                break
                case 11:
                    pago = resp.pago11
                    valor = resp.valor11
                    break;
                case 12: 
                    pago = resp.pago12
                    valor = resp.valor12
                    break           
            }
            const resposta = {
                "pago": pago,
                "valor": valor
            }
            console.log(resposta)
            return resposta
          })
    }
    addEvento() {
        this.campo_ano.addEventListener('change', e => {
            this.ano = e.target.value
            
            this.listar()
        })        
    }
}



    

    document.getElementById('ano_ref').value = ano[1]