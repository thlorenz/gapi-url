'use strict'

const jsdom  = require('jsdom')
const JSDOM = jsdom.JSDOM

const browserify = require('browserify')
const testPath = require.resolve('../gapi-url')

const b = browserify()
b.add(testPath)
b.bundle(runTest)

const consoleIntercept = {}
var lastLine = null
consoleIntercept.error = function consoleError(s) {
  console.error.apply(console, arguments)
}
consoleIntercept.log = function consoleLog(s) {
  if (s != null && s.trim().length > 0) lastLine = s
  console.log.apply(console, arguments)
}

function runTest(err, buf) {
  const script = buf.toString()
  if (err != null) {
    process.exitCode = -1
    return
  }
  const virtualConsole = new jsdom.VirtualConsole()
  virtualConsole.sendTo(consoleIntercept)

  // eslint-disable-next-line no-new
  new JSDOM(
      '<html><head><script>' + script + '</script></head><body></body></html>'
    , { runScripts: 'dangerously', resources: 'usable', virtualConsole: virtualConsole }
  )
}

process.on('exit', onprocessExit)
function onprocessExit(code) {
  if (code !== 0) return
  if (/# *ok/.test(lastLine)) return
  process.exitCode = 1
}
