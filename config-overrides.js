const path = require('path')
const { override, fixBabelImports, addLessLoader, addBabelPlugin } = require('customize-cra')
const addSvgLoader = (loaderOptions = {}) => (config) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })
  console.log(config)
  return config
}
module.exports = override(
  addBabelPlugin('babel-plugin-styled-components'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#00A680' }
  })
  // addSvgLoader()
)
