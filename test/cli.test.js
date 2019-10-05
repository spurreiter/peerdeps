const assert = require('assert')
const { cli } = require('..')

describe('cli', () => {
  const tests = [
    [['--help'], { help: true }],
    [['-h'], { help: true }],
    [['-?'], { help: true }],
    [['--version'], { version: require('../package.json').version }],
    [['--dir', './test'], { cwd: __dirname }],
    [['-d', '/dir'], { cwd: '/dir' }],
    [['--quiet'], { quiet: true }],
    [['-q'], { quiet: true }],
    [['--list'], { list: true }],
    [['-l'], { list: true }],
    [['one', 'two', 'three'], {}]
  ]
  tests.forEach(test => {
    const [argv, exp] = test
    it(argv.join(' '), () => {
      const res = cli(argv)
      assert.deepStrictEqual(res, exp)
    })
  })
})
