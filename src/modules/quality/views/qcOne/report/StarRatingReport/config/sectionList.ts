import { SectionListItem } from './../model/StarRatingReportEditModel'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 星级考核表模块 from '../components/星级考核表/星级考核表模块'
import 星级考核表弹窗 from '../components/星级考核表/星级考核表弹窗'

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
    sectionId: '星级考核',
    sectionTitle: '星级考核',
    modalTitle: '编辑星级考核',
    data: {},
    section: 星级考核表模块,
    modal: 星级考核表弹窗,
    modalWidth: 900
  }
]
