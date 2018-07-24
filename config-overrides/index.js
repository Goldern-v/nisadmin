const rewireTypescript = require('react-app-rewire-typescript')
const rewireTsJest = require('react-app-rewire-ts-jest')

module.exports = {
  webpack: (config, env) => {
    config = rewireTypescript(config, env)

    return config
  },
  jest: (config) => {
    config = rewireTsJest(config)

    return config
  }
}
