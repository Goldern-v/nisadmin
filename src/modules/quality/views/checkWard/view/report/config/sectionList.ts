import { SectionListItem } from '../CheckWardReportViewModal'
import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 本月主要质量问题模块 from '../components/本月主要质量问题/本月主要质量问题模块'
import 本月主要质量问题弹窗 from '../components/本月主要质量问题/本月主要质量问题弹窗'
import 本月查房情况模块 from '../components/本月查房情况/本月查房情况模块'
import 本月查房情况弹窗 from '../components/本月查房情况/本月查房情况弹窗'
import 本月查房详情模块 from '../components/本月查房详情/本月查房详情模块'
import 本月查房详情弹窗 from '../components/本月查房详情/本月查房详情弹窗'

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
    sectionId: '本月查房情况',
    sectionTitle: '本月查房情况',
    modalTitle: '编辑本月查房情况',
    data: {},
    section: 本月查房情况模块,
    modal: 本月查房情况弹窗
  },
  {
    sectionId: '本月查房详情',
    sectionTitle: '本月查房详情',
    modalTitle: '编辑本月查房详情',
    data: {},
    section: 本月查房详情模块,
    modal: 本月查房详情弹窗
  }
]
