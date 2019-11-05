import { SectionListItem } from './../model/BadEventReportEditModel'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 不良事件记录表模块 from '../components/不良事件记录表/不良事件记录表模块'
import 不良事件记录表弹窗 from '../components/不良事件记录表/不良事件记录表弹窗'

export const sectionList: SectionListItem[] = [
  {
    sectionId: '报告名称',
    sectionTitle: '报告名称',
    modalTitle: '编辑报告名称',
    data: {},
    section: 标题模块,
    modal: 标题弹窗
  },
  {
    sectionId: '不良事件记录',
    sectionTitle: '不良事件记录',
    modalTitle: '编辑不良事件记录',
    data: {},
    section: 不良事件记录表模块,
    modal: 不良事件记录表弹窗,
    modalWidth: 900
  }
]
