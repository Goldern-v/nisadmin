const rewireStyledComponents = require('react-app-rewire-styled-components')
const rewireTypescript = require('react-app-rewire-typescript')
const rewireTsJest = require('react-app-rewire-ts-jest')

const tsOptions = require('./typescript-options')
const rewireAntd = require('./rewire-antd')
const rewireTsPaths = require('./rewire-ts-paths')
const rewireTsJestPaths = require('./rewire-ts-jest-paths')

module.exports = {
  webpack: (config, env) => {
    config = rewireStyledComponents(config, env)
    config = rewireAntd(config, env)

    if (env === 'development') {
      config = rewireTypescript(config, env, tsOptions)
    } else {
      config = rewireTypescript(config, env)
    }

    config = rewireTsPaths(config, env)

    return config
  },
  jest: (config) => {
    config = rewireTsJest(config)
    config = rewireTsJestPaths(config)

    return config
  }
}
