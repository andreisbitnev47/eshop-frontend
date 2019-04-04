const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/:language/shop/:handle', (req, res) => {
      const actualPage = '/product'
      const queryParams = { handle: req.params.handle, language: req.params.language }
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/:language/shop', (req, res) => {
      const actualPage = '/shop'
      const queryParams = { language: req.params.language }
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/:language/about', (req, res) => {
      const actualPage = '/about'
      const queryParams = { language: req.params.language }
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/:language/', (req, res) => {
      const actualPage = '/index'
      const queryParams = { language: req.params.language }
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/*', (req, res) => {
      return handle(req, res)
    });

    server.listen(process.env.PORT, err => {
      if (err) throw err
      console.log(`> Ready on port ${process.env.PORT}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })