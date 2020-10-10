const { resolve } = require('path')
// const { progressBar, ttyout } = require('./ttyout')

const startsWithDash = (str) => str && str[0] === '-'

const error = (o, msg) => {
  o.error = msg
  return o
}

function cli (argv = process.argv.slice(2)) {
  const o = {
    peer: true
  }

  while (argv.length) {
    const arg = argv.shift()

    switch (arg) {
      case '-?':
      case '-h':
      case '--help': {
        o.help = true
        break
      }
      case '--version': {
        o.version = require('../package.json').version
        break
      }
      case '-q':
      case '--quiet': {
        o.quiet = true
        break
      }
      case '-d':
      case '--dir': {
        const arg1 = argv.shift()
        if (!arg1 || startsWithDash(arg1)) {
          return error(o, `option "${arg}" needs dirname`)
        }
        o.cwd = resolve(process.cwd(), arg1)
        break
      }
      case '-l':
      case '--list': {
        o.list = true
        break
      }
      case '--optional': {
        o.optional = true
        break
      }
      case '--no-peer': {
        o.peer = false
        break
      }
      default: {
        break
      }
    }
  }

  return o
}

module.exports = {
  cli
}
