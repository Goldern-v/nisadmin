const path = require('path')
const { override, fixBabelImports, addLessLoader, addBabelPlugin } = require('customize-cra')
const otherLoader = (loaderOptions = {}) => (config) => {
  //解决Critical dependency: require function is used in a way in which dependencies cannot be statically extracted的问题
  config.module.unknownContextCritical = false
  return config
}

module.exports = override(
  addBabelPlugin('babel-plugin-styled-components'),
  addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  fixBabelImports('antd-mobile', {
    libraryName: 'antd-mobile',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#00A680',
      '@brand-primary': '#00A680',
      '@brand-primary': '#00A680',
      '@brand-primary-tap': '#1db38b',
      '@color-text-secondary': '#00A680',
    }
  }),
  otherLoader()
)
