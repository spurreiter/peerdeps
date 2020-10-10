#!/usr/bin/env node

const { cli, run } = require('..')

function help () {
  console.log(`
  peerdeps [options] [package ...]

    --help|-h|-?          this help
    --version             show version
    --quiet|-q            quiet mode; no console.log
    --dir|-d <dirname>    use different dirname instead of cwd
    --list|-l             list found (peer)Dependencies
    --optional            install optionalDependencies
    --no-peer             do not install peerDependencies

  examples:

    peerdeps              install peer dependencies
    peerdeps -l           list peer dependencies

  `)
}

function logError (err) {
  console.error(err)
  process.exit(1)
}

const cmd = cli()
if (cmd.version) {
  console.log(cmd.version)
} else if (cmd.help) {
  help()
} else if (cmd.error) {
  logError(cmd.error)
} else {
  cmd.cli = true
  run(cmd)
    .then(results => {
      if (cmd.list) console.log(results)
    })
    .catch(e => {
      logError(e.message)
    })
}
