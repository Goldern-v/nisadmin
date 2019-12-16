import { SectionListItem } from '../model/PatientVisitMonthModel'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 月度随访表模块 from '../components/月度随访表/月度随访表模块'
import 月度随访表弹窗 from '../components/月度随访表/月度随访表弹窗'
import 附件模块 from '../components/附件/附件模块'
import 附件弹窗 from '../components/附件/附件弹窗'

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
    sectionId: '月度随访',
    sectionTitle: '月度随访',
    modalTitle: '编辑月度随访',
    data: {},
    section: 月度随访表模块,
    modal: 月度随访表弹窗,
  },
  {
    sectionId: '附件',
    sectionTitle: '附件',
    modalTitle: '编辑附件',
    data: {},
    section: 附件模块,
    modal: 附件弹窗
  }
]
