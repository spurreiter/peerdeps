const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const fsReadFile = promisify(fs.readFile)

class PckgJson {
  constructor ({ cwd, filename = 'package.json', peer = true, optional, optionalDev } = {}) {
    this.cwd = cwd || process.cwd()
    this.filename = resolve(this.cwd, filename)
    this.deps = Object.entries({ peer, optional, optionalDev: optional })
      .reduce((arr, [dep, use]) => {
        if (use) arr.push(`${dep}Dependencies`)
        return arr
      }, [])
  }

  _extract (content) {
    const packages = {}
    this.deps.forEach(dep => {
      Object.entries(content[dep] || {}).forEach(([pckg, version]) => {
        packages[pckg] = version
      })
    })
    return packages
  }

  async read () {
    return fsReadFile(this.filename, 'utf8')
      .then(str => JSON.parse(str))
      .then(content => this._extract(content))
  }
}

module.exports = {
  PckgJson
}
