const repository = require('../repositories/repCarteirinha')

// -------------------------------------------------------------- Rota renderizada  ---//
exports.get = async (req, res, next) => {
    const carteirinhas = await repository.get()
    res.send(carteirinhas)
}

