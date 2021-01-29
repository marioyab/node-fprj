const express = require('express')
const router = express.Router()
const controller = require('../controllers/mensalidades')

router.get('/:ano', controller.get)
router.get('/:id_academia/:ano', controller.getMes)
router.post('/salvar', controller.post)


module.exports = router