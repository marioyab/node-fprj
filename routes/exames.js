const express = require('express')
const router = express.Router()

const controller = require('../controllers/exames')

router.get('/', controller.getBusca)

router.get('/ano/:ano', controller.listaEventosAno)

router.get('/ata/:codevento', controller.getAta)
router.get('/ata/getAdicionarAtletas/:codevento', controller.getAdicionarAtletas)

router.get('/ata/editar/:codevento/:codatleta/:codativ', controller.editar)
router.post('/ata/inserirAtleta', controller.post)

router.get('/atividades/tipo/:tipoativ', controller.getAtividadesPorTipo)
router.post('/delete', controller.delete)
module.exports = router