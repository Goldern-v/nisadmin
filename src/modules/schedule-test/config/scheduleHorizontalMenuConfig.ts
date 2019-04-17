import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import Schedule1View from '../views/Schedule1View'
import Schedule2View from '../views/Schedule2View'
import Schedule3View from '../views/Schedule3View'

/** 侧边菜单配置信息 */

export const scheduleHorizontalMenuConfig: HorizontalMenuItem[] = [
  {
    name: '排班统计',
    type: '1',
    component: Schedule1View
  },
  {
    name: '排班护士表',
    type: '2',
    childrens: [
      {
        name: '护士排班统计(按班次)',
        type: '3',
        component: Schedule2View
      },
      {
        name: '护士白班统计(按月份)',
        type: '4',
        component: Schedule3View
      }
    ]
  }
]
