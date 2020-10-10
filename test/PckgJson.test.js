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

  it('shall read optionalDependencies and peerDependencies', () => {
    const cwd = `${__dirname}/fixtures`
    const pckg = new PckgJson({ cwd, optional: true })
    return pckg.read().then(packages => {
      log(packages)
      assert.deepStrictEqual(packages, {
        'hosted-git-info': 'github:npm/hosted-git-info#v2.1.0',
        superagent: '^3.0.0',
        debug: '*',
        supertest: '^5'
      })
    })
  })

  it('shall read optionalDevDependencies and no peerDependencies', () => {
    const cwd = `${__dirname}/fixtures`
    const pckg = new PckgJson({ cwd, peer: false, optional: true })
    return pckg.read().then(packages => {
      log(packages)
      assert.deepStrictEqual(packages, {
        debug: '*',
        supertest: '^5'
      })
    })
  })
})
