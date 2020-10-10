const { spawn } = require('child_process')

function _spawn (cmd, args, { cwd, quiet } = {}) {
  const opts = {
    cwd: cwd || process.cwd(),
    stdio: !quiet && 'inherit',
    windowsHide: true
  }
  return new Promise((resolve, reject) => {
    const runner = spawn(cmd, args, opts)
    runner.on('error', (err) => reject(err))
    runner.on('close', (code) => resolve(code))
  })
}

function npmInstall (packages, { cwd, quiet } = {}) {
  const _packages = Object.entries(packages)
    .map(([pckg, version]) => `${pckg}@${version}`)
  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const args = ['install', '--no-save', '--no-package-lock'].concat(_packages)
  return _spawn(cmd, args, { cwd, quiet })
}

module.exports = {
  npmInstall
}
