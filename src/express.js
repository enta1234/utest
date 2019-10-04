const app = require('express')()
const bodyParser = require('body-parser')
const explog = require('explog')

module.exports = class Express {
  constructor (props) {
    this.propertices = props
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(explog({}))
  }


  start () {
    if (app) {
      console.info('---------------[' + this.propertices.scenario + ']---------------')
      this.initialize (this.propertices)
      app.listen(this.propertices.port, () => console.info('has start at PORT: ' + this.propertices.port))
    } else {
      return new Express(this.propertices).start()
    }
  }

  initialize (cg) {
    const sequence = cg.sequence
    for (const sequ of sequence) {
      const method = sequ.method ? sequ.method.toLowerCase() : 'all'
      const headers = sequ.headers || {}
      const ctype = headers['content-type'] ? headers['content-type'] : headers['content-type'] = 'application/json'
      const code = sequ.code || 200
      const body = sequ.body
      
      console.info(method.toUpperCase(), sequ.part + ' | ' + 'OPENED')
      app[method](sequ.part, (req, res) => {
        if (ctype === 'application/json') {
          return res.set(headers).status(code).json(body)
        } else {
          return res.set(headers).status(code).send(body)
        }
      })
    }
  }
}
