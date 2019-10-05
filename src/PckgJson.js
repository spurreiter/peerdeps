const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const fsReadFile = promisify(fs.readFile)

class PckgJson {
  constructor ({ cwd, filename = 'package.json' } = {}) {
    this.cwd = cwd || process.cwd()
    this.filename = resolve(this.cwd, filename)
  }

  static _extract (content) {
    const packages = {}
    ;['peerDependencies'].forEach(dep => {
      Object.entries(content[dep] || {}).forEach(([pckg, version]) => {
        packages[pckg] = version
      })
    })
    return packages
  }

  async read () {
    return fsReadFile(this.filename, 'utf8')
      .then(str => JSON.parse(str))
      .then(content => PckgJson._extract(content))
  }
}

module.exports = {
  PckgJson
}
