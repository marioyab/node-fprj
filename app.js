// Módulos
    const express = require('express')
    const bodyparser = require('body-parser')
    const handlebars = require('express3-handlebars')
    const session = require('express-session')
    const flash = require('connect-flash')
    const path = require('path')
    const moment = require('moment')
    require('dotenv').config()

    const academias = require('./routes/academias')
    const mensalidades = require('./routes/mensalidades')
    const atletas = require('./routes/atletas')
    const exames = require('./routes/exames')
    const admin = require('./routes/admin')
    const carteirinhas = require('./routes/routeCarteirinha')
    const app = express()
    
    require('dotenv')
// Configurações
     // Sessão
     app.use(session({
        secret: 'miya872049',
        resave: true,
        saveUninitialized: true
    }))
    
    app.use(flash())

// Middleware
    app.use((req, res,next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })
    // body-parser
        app.use(bodyparser.urlencoded({extended: true}))
        app.use(bodyparser.json())
    // Handlebars
        app.engine('handlebars', handlebars({
            defaultLayout: 'main',
            helpers: {
                formatDiaMes: (date) => {
                    return moment(date).format('DD/MM')
                },
                formatDate: (date) => {
                    if (!date) {
                        return ''
                    } else {
                        return moment(date).format('DD/MM/YYYY')
                    }
                }
            }
        }))
        app.set('view engine', 'handlebars')
    // Public
        app.use(express.static(path.join(__dirname, 'public')))

// Rotas
    const css = ['index.css']
    app.get('/', (req, res) => res.render('index', { css: css }))

    app.use('/academias', academias)
    app.use('/mensalidades', mensalidades)
    app.use('/atletas', atletas)
    app.use('/exames', exames)
    app.use('/admin', admin)
    app.use('/carteirinhas', carteirinhas)

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
    console.log(`Servidor http://${host}:${port}`)
})

process.on('SIGINT', () => {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(1);
  });