const rewire = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

module.exports = function rewireAntd (config, env) {
  config = rewire.injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config)

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1890FF" },
  })(config, env)

  return config
}
