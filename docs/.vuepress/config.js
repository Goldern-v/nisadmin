


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
      // { text: 'Home', link: '/' },
      // {
      //   text: 'React',
      //   items: reactRouterList
      //     .filter((route) => !(route instanceof Array)).map((route) => ({
      //       text: route,
      //       link: `/react/${route}`
      //     }))
      // },
    ],
    sidebar: {
      // '/react/': [
      //   {
      //     title: 'React',
      //     collapsable: false,
      //     sidebarDepth: 2,
      //     children: reactRouterList.map((route) => formatRoute(route, '介绍'))
      //   }
      // ]
    }
  }
}
