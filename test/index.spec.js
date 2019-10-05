const assert = require('assert')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const { run } = require('..')

describe('#npm', function () {
  const cwd = `${__dirname}/fixtures/test`
  const nodeModules = path.resolve(cwd, 'node_modules')

  before((done) => {
    rimraf(nodeModules, done)
  })

  it('shall return list of peerDependencies', function () {
    return run({ cwd, list: true })
      .then((packages) => {
        assert.deepStrictEqual(packages, {
          'hosted-git-info': 'github:npm/hosted-git-info#v2.1.0',
          superagent: '^3.0.0'
        })
      })
  })

  it('shall install peerDependencies', function () {
    this.timeout(10000)
    return run({ cwd })
      .then(() => {
        const stats = fs.statSync(nodeModules)
        assert.ok(stats.isDirectory())
      })
  })
})
