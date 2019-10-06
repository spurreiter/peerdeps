const os = require('os')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')

const nodeBin = process.execPath
const binDir = path.dirname(nodeBin)
let npmBin = path.resolve(binDir, 'npm')

if (os.platform() === 'win32') {
  npmBin += '.cmd'
}
if (fs.statSync(npmBin)) {
  if (fs.lstatSync(npmBin).isSymbolicLink()) {
    npmBin = path.resolve(binDir, fs.readlinkSync(npmBin))
  }
}

function _spawn (cmd, args, { cwd, quiet } = {}) {
  const opts = {
    cwd: cwd || process.cwd(),
    windowsHide: true
  }
  return new Promise((resolve, reject) => {
    const runner = spawn(cmd, args, opts)
    if (!quiet) {
      runner.stdout.on('data', (data) => { console.log(data.toString()) })
      runner.stderr.on('data', (data) => { console.error(data.toString()) })
    }
    runner.on('error', (err) => reject(err))
    runner.on('close', (code) => resolve(code))
  })
}

function npmInstall (packages, { cwd, quiet } = {}) {
  const _packages = Object.entries(packages)
    .map(([pckg, version]) => `${pckg}@${version}`)
  const cmd = npmBin
  const args = ['install', '--no-save', '--no-package-lock'].concat(_packages)
  return _spawn(cmd, args, { cwd, quiet })
}

module.exports = {
  nodeBin,
  npmBin,
  npmInstall
}
