import { SectionListItem } from './../model/SafetyCheckEditModel'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 安全隐患排查模块 from '../components/安全隐患排查/安全隐患排查模块'
import 安全隐患排查弹窗 from '../components/安全隐患排查/安全隐患排查弹窗'

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
    sectionId: '安全隐患排查',
    sectionTitle: '安全隐患排查',
    modalTitle: '编辑安全隐患排查',
    data: {},
    section: 安全隐患排查模块,
    modal: 安全隐患排查弹窗,
    modalWidth: 1100
  }
]
