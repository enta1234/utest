const axios = require('axios').default
const Validate = require('./validator')

module.exports = class Callers {
  constructor(msg) {
    this.configs = msg
  }

  async start () {
    if (this.configs) {
      for (let i = 0; i < this.configs.messages.length; i++) {
        const m = this.configs.messages[i]
        const v = this.configs.test[i]
        console.info('Start call service to -> ' + m.name)
        const url = m.url
        const response = await axios({ method: m.method, url: url, headers: m.headers, body: m.body })
        new Validate(v).validate(response)
      }
    }
  }
  
}