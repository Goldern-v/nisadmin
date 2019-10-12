import { SectionListItem } from '../CheckWardReportViewModal'
import 标题模块 from '../components/标题/标题模块'
import 本月查房情况模块 from '../components/本月查房情况/本月查房情况模块'
import 本月查房详情模块 from '../components/本月查房详情/本月查房详情模块'

export const sectionList: SectionListItem[] = [
  {
    sectionId: '报告名称',
    sectionTitle: '报告名称',
    modalTitle: '编辑报告名称',
    data: {},
    section: 标题模块,
  },
  {
    sectionId: '本月查房情况',
    sectionTitle: '本月查房情况',
    modalTitle: '编辑本月查房情况',
    data: {},
    section: 本月查房情况模块,
  },
  {
    sectionId: '本月查房详情',
    sectionTitle: '本月查房详情',
    modalTitle: '编辑本月查房详情',
    data: {},
    section: 本月查房详情模块,
  }
]
