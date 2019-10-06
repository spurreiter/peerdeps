const assert = require('assert')
const { PckgJson } = require('../src/PckgJson')

const log = () => {} // console.log

describe('#PckgJson', () => {
  it('shall read peerDependencies', () => {
    const cwd = `${__dirname}/fixtures`
    const pckg = new PckgJson({ cwd })
    return pckg.read().then(packages => {
      log(packages)
      assert.deepStrictEqual(packages, {
        'hosted-git-info': 'github:npm/hosted-git-info#v2.1.0',
        superagent: '^3.0.0'
      })
    })
  })
})
