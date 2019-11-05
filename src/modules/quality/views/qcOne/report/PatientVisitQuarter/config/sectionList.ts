import { SectionListItem } from '../model/PatientVisitQuarterModel'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 季度随访表模块 from '../components/季度随访表/季度随访表模块'
import 季度随访表弹窗 from '../components/季度随访表/季度随访表弹窗'

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
    sectionId: '季度随访',
    sectionTitle: '季度随访',
    modalTitle: '编辑季度随访',
    data: {},
    section: 季度随访表模块,
    modal: 季度随访表弹窗,
    modalWidth: 1200
  }
]
