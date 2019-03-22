function rewireSvgLoader(config, env) {
  const rule = config.module.rules
  rule.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader']
  })
  console.log(config, 'rules')
  return config
}

module.exports = rewireSvgLoader
