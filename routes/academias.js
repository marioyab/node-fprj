const express = require('express')

const router = express.Router()
const controller = require('../controllers/academias')

// Rotas renderizadas 
    // Rotas com pesquisa/acesso ao banco de dados
    router.get('/', controller.get)
    router.get('/busca/:nome', controller.getBusca)
    router.get('/editar/:codigo', controller.getEditar)
    
    // Altera a tabela
    router.post('/inserir', controller.inserir)
    router.post('/salvar/:codigo', controller.salvar)
    router.post('/desativar/:codigo', controller.desativar)
    
    // Rotas sem pesquisa/sem acesso ao banco de dados//
    router.get('/cadastro/nova', controller.nova)
    
// Rotas de pesquisa/busca (retorna apenas o resultado)
router.get('/:codigo', controller.getByCodigo)
router.get('/nomes/:nome', controller.getByNome)


module.exports = router