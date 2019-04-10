const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true /* para manipular o nome dos arquivos */,
  express: app /* recebe a variavel que contem o nosso servidor express, no caso o nome da variável é app */,
  watch: true /* tem a mesma função do nodemon, que é o recarregamento de tudo que for efetuado de forma automatica para o nunjucks */
})
/* seta qual extensão de arquivo o nunjucks utilizara */
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkAgeQueryParams = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/major', checkAgeQueryParams, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.get('/minor', checkAgeQueryParams, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
