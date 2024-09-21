const express = require('express')
const expresshandlebars = require('express-handlebars')
const randomizer = require('./lib/randomizer')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/src'))

app.engine('handlebars', expresshandlebars.engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/random', (req, res) => {
    res.render('random', { random: randomizer.randomizerExample() })
})

app.use((req, res) => {
    res.type('text/html')
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.render('500')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})