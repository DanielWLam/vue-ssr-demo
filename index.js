const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const createApp = require('./app')

server.get('*', (req, res) => {
  const context = {
    title: 'hello',
    url: req.url
  }
  const app = createApp(context)
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
    }
    res.end(html)
  })
})

server.listen(8888, () => {
  console.log(`Listening on: localhost:${8888}`)
})
