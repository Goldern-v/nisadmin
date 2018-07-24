const rewireStyledComponents = require('react-app-rewire-styled-components')
const rewireTypescript = require('react-app-rewire-typescript')
const rewireTsJest = require('react-app-rewire-ts-jest')

const tsOptions = require('./typescript-options')

module.exports = {
  webpack: (config, env) => {
    config = rewireStyledComponents(config, env)

    if (env === 'development') {
      config = rewireTypescript(config, env, tsOptions)
    } else {
      config = rewireTypescript(config, env)
    }

    return config
  },
  jest: (config) => {
    config = rewireTsJest(config)

    return config
  }
}
