const os = require('os')
const assert = require('assert')
const { cli } = require('..')
const osWin32 = os.platform() === 'win32'

describe('cli', () => {
  const tests = [
    [['--help'], { help: true, peer: true }],
    [['-h'], { help: true, peer: true }],
    [['-?'], { help: true, peer: true }],
    [['--version'], { version: require('../package.json').version, peer: true }],
    [['--dir', './test'], { cwd: __dirname, peer: true }],
    [['-d', '/dir'], { cwd: osWin32 ? 'C:\\dir' : '/dir', peer: true }],
    [['--quiet'], { quiet: true, peer: true }],
    [['-q'], { quiet: true, peer: true }],
    [['--list'], { list: true, peer: true }],
    [['-l'], { list: true, peer: true }],
    [['--optional'], { optional: true, peer: true }],
    [['-l', '--optionalDev'], { list: true, optionalDev: true, peer: true }],
    [['--no-peer'], { peer: false }],
    [['one', 'two', 'three'], { peer: true }]
  ]
  tests.forEach(test => {
    const [argv, exp] = test
    it(argv.join(' '), () => {
      const res = cli(argv)
      assert.deepStrictEqual(res, exp)
    })
  })
})
