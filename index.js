#!/usr/bin/env node

/*!
 * utest
 * Copyright(c) 2019 Chantatha Polsamak <chantatha.p@gmail.com>
 * MIT Licensed
 */

'use strict'

const { version } = require('./package.json')
const Controller = require('./src/controllers')
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version',
    s: 'start'
  }
})

class Main extends Controller {
  constructor (argv) {
    super(argv)
  }
}

new Main(argv).start()
