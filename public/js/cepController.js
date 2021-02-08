export class cepController {
    constructor(cep, endereco, numero, complemento, bairro, cidade, uf) {
        this.endereco = endereco
        this.bairro = bairro
        this.compĺemento = complemento
        this.cidade = cidade
        this.uf = uf
        this.numero = numero
        this.cep = cep
        this.onBlur()
    }
    
    getValue() {
        let valor = this.cep.value
        valor = valor.replace(/[.-]/g, '')
        return valor
    } 
    onBlur() {
        this.cep.addEventListener('blur', () => this.buscarEndereco())
    }
    limparCampos() {
        this.endereco.value = ''
        this.complemento = ''
        this.bairro.value = ''
        this.cidade.value = ''
        this.uf.value = ''
    }

    setResultado(endereco) {
        this.endereco.value = endereco.logradouro.toUpperCase()
        // this.complemento.value = endereco.complemento.toUpperCase()
        this.bairro.value = endereco.bairro.toUpperCase()
        this.cidade.value = endereco.localidade.toUpperCase()
        this.uf.value = endereco.uf.toUpperCase()
        this.numero.focus()
    }

    buscarEndereco() {
        let valor = this.getValue()
        let url = 'http://viacep.com.br/ws/' + valor + '/json'
        let promise = fetch(url)
        promise.then(resp => {
            return resp.json()
        }).then(endereco => {
            this.limparCampos()
            if (endereco.erro) {
                alert('Endereço não encontrado para esse CEP.')
            } else {
                if (!endereco.erro) {
                    this.setResultado(endereco)
                }
            }
        })
    }
}