const fs = require('fs')
const Express = require('./express')
const Callers = require('./callers')
module.exports = class Controllers {
  constructor (path) {
    this.configs = convertJSON(this.constructor.initialize(path))
  }

  static initialize (p) {
    if (p._[1]) {
      return fs.readFileSync(p._[1], {}).toString('utf8')
    } else {
      throw new TypeError('config isn\'t null')
    }
  }

  async start () {
    if (this.configs) {
      for (const cg of this.configs) {
        await new Express(cg).start()
        new Callers(cg).start()
      }
    }
  }

}

function convertJSON (c) {
  try {
    return JSON.parse(c)
  } catch (error) {
    throw TypeError('type of configs not JSON.')
  }
}