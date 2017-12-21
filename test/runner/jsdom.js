'use strict'

const fs = require('fs')
const path = require('path')
const jsdom  = require('jsdom')
const JSDOM = jsdom.JSDOM

const scriptPath = path.join(__dirname, '..', '..', 'build', 'bundle.js')
const script = fs.readFileSync(scriptPath, 'utf8')

const dom = new JSDOM(
    '<html><head><script>' + script + '</script></head><body></body></html>'
  , { runScripts: 'dangerously', resources: 'usable' }
)

console.log(dom.window.document.head.children.length)
