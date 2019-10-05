const { cli } = require('./cli.js')
const { PckgJson } = require('./PckgJson.js')
const { npmInstall } = require('./npmInstall.js')

const run = (opts) => {
  const pckg = new PckgJson(opts)
  return pckg.read()
    .then(packages => {
      return opts.list
        ? packages
        : npmInstall(packages, opts)
    })
}

module.exports = {
  cli,
  run
}
