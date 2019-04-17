const { override, fixBabelImports, addLessLoader, addBabelPlugin } = require('customize-cra')
module.exports = override(
  addBabelPlugin('babel-plugin-styled-components'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#5BBE98' }
  })
)
