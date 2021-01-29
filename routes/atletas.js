const express = require('express')

const router = express.Router()
const controller = require('../controllers/atletas')

// Rotas renderizadas
    // Rotas com pesquisa/acesso ao banco de dados
 /*   router.get('/busca/:nome', controller.getBusca) */
    router.get('/editar/:codigo', controller.editar)    
    
    
    // Altera a tabela
    // router.post('/inserir', controller.inserir)
    // router.post('/salvar/:codigo', controller.salvar)
    // router.delete('/', controller.delete)
    
    // Rotas sem pesquisa/sem acesso ao banco de dados//*/
    router.get('/', controller.pagBusca)
    router.get('/cadastro/novo', controller.getCadastro)
    
// Rotas de pesquisa/busca (retorna apenas o resultado)
  //  router.get('/:codigo', controller.getByCodigo)
    router.get('/buscar/:nome', controller.getBusca)
    router.get('/codigo/:codigo', controller.getByCodigo)

module.exports = router

