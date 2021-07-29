
const routeList = [
  {
    path: '基本信息',
    title: '基本信息',
    redict: '',
    collapsable: false,
    sidebarDepth: 1,
    children: [
      '介绍',
      '命令行说明',
      '开发环境接口代理',
      '数据管理',
    ]
  },
  {
    path: '业务模块',
    title: '业务模块',
    redict: '',
    collapsable: false,
    sidebarDepth: 1,
    children: [
      '首页',
      '登录',
      '病区日志',
      '病区登记本',
    ]
  }
]

const createNav = (routeList) => (
  routeList.map((routeItem) => ({
    text: routeItem.title,
    items: routeItem.children.map((child) => ({
      text: child === '' ? redict || 'Index' : child,
      link: `/${routeItem.path}/${child}`
    }))
  }))
)

const createSideBar = (routeList) => {
  let routeObj = {}

  for (let i = 0; i < routeList.length; i++) {
    const routeItem = routeList[i]

    const { path, children, ...sidebarCfg } = routeItem

    if (path)
      routeObj[`/${path}/`] = [
        {
          children: children.map((childItem) => formatRoute(childItem, childItem.redict)),
          ...sidebarCfg,
        }
      ]
  }

  return routeObj
}

const formatRoute = (route, indexTitle) => {
  let title = route
  let maxLength = 32
  if (route === '') title = indexTitle || 'Index'

  if (getByteLen(title) > maxLength) {
    let orginTitle = title
    let currentLength = 0
    let appendIdx = 0

    title = ''

    while (currentLength <= maxLength) {
      let target = orginTitle[appendIdx]

      title += target

      if (target.match(/[^\x00-\xff]/ig)) {
        currentLength += 2
      } else {
        currentLength += 1
      }
      appendIdx++
    }

    title += '...'
  }

  return [route, title]
}

const getByteLen = (val) => {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    }
    else {
      len += 1;
    }
  }
  return len;
}

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  title: '护理管理|前端项目文档',
  description: 'nursing manage front-end doc',
  base: isDev ? '/' : '/crNursing/front-end-doc/manage/',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: '首页', link: '/' },
      ...createNav(routeList)
    ],
    sidebar: createSideBar(routeList)
  }
}
