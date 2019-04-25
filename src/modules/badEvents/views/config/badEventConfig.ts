import { HorizontalMenuItem } from 'src/types/horizontalMenu'

import EventSearch from '../EventSearch/EventSearch'
import EventReport from '../EventReport/EventReport'
import EventAlanysis from '../EventAlanysis/EventAlanysis'
import EventFrequentOccurence from '../EventFrequentOccurence/EventFrequentOccurence'

import BadEventEditorView from '../BadEventEditorView'

export const BadEventConfig: HorizontalMenuItem[] = [
  {
    type: 'search',
    component: EventSearch,
    name: '不良事件查询'
  },
  {
    type: 'report',
    component: EventReport,
    name: '不良事件汇总表'
  },
  {
    type: 'frequentOccurence',
    component: EventFrequentOccurence,
    name: '不良事件发生率'
  },
  {
    type: 'alanysis',
    component: EventAlanysis,
    name: '不良事件分析报告'
    // childrens: [
    //   {
    //     type: 'edit',
    //     component: BadEventEditorView,
    //     name: '不良事件编辑'
    //   }
    // ]
  }
]

export default { BadEventConfig }
