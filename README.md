# peerdeps

[![NPM version](https://badge.fury.io/js/peerdeps.svg)](https://www.npmjs.com/package/peerdeps/)

> Install peer package dependencies.

Zero dependencies, no post-install stuff, no magic.

## cli

```
  peerdeps [options] [package ...]

    --help|-h|-?          this help
    --version             show version
    --quiet|-q            quiet mode; no console.log
    --dir|-d <dirname>    use different dirname instead of cwd
    --list|-l             list peerDependencies

  examples:

    peerdeps              install peer dependencies
    peerdeps -l           list peer dependencies

```

## api

See `src/index.js` for usage.


## license

MIT licensed
