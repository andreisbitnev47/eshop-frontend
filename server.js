const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');

function getLanguage(queryParam, req) {
  const availableLanguages = ['en', 'est', 'rus'];
  const defaultLanguage = 'est';
  const cookieLanguage = req.cookies.language;
  const language = availableLanguages.includes(queryParam) ? queryParam :
  !!cookieLanguage ? cookieLanguage : defaultLanguage;
  return language;
}

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.use((req, res, next) => {
      // check if request is not for a file
      if (req.path.indexOf('.') !== -1) {
        next();
        return;
      }
      const availableLanguages = ['en', 'est', 'rus'];
      const defaultLanguage = 'est';
      const cookieLanguage = req.cookies.language;
      const queryLanguage = req.path.split('/')[1];
      const language = availableLanguages.includes(queryLanguage) ? queryLanguage : defaultLanguage;
      if (queryLanguage !== language) {
        res.redirect(`/${language}${req.path}`);
        return;
      } else {
        next();
      }
    });

    server.get('/:language/shop/:handle', (req, res) => {
      const actualPage = '/product';
      const queryParams = { handle: req.params.handle, language: req.params.language };
      app.render(req, res, actualPage, queryParams);
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

    server.get('/:language/privacy', (req, res) => {
      const actualPage = '/privacy'
      const queryParams = { language: req.params.language }
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/:language/terms', (req, res) => {
      const actualPage = '/terms'
      const queryParams = { language: req.params.language }
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/:language/cart', (req, res) => {
      const actualPage = '/cart'
      const queryParams = { language: req.params.language }
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/:language/checkout', (req, res) => {
      const actualPage = '/checkout'
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