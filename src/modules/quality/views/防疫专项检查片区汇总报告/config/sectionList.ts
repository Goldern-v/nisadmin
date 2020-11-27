import { SectionListItem } from '../ReportModal'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
// import 一级标题模块 from '../components/一级标题/一级标题模块'
// import 统一标题列表模块 from '../components/统一标题列表/统一标题列表模块'
// import 统一标题列表弹窗 from '../components/统一标题列表/统一标题列表弹窗'
import 本月片区人力资源调配模块 from '../components/本月片区人力资源调配/本月片区人力资源调配模块'
import 本月片区人力资源调配弹窗 from '../components/本月片区人力资源调配/本月片区人力资源调配弹窗'
import 本月片区不良事件汇总表弹窗 from '../components/本月片区不良事件汇总表/本月片区不良事件汇总表弹窗'
import 本月片区不良事件汇总表模块 from '../components/本月片区不良事件汇总表/本月片区不良事件汇总表模块'
import 本月护理质量检查问题及持续改进弹窗 from '../components/本月护理质量检查问题及持续改进/本月护理质量检查问题及持续改进弹窗'
import 本月护理质量检查问题及持续改进模块 from '../components/本月护理质量检查问题及持续改进/本月护理质量检查问题及持续改进模块'
import 下月工作重点弹窗 from '../components/下月工作重点/下月工作重点弹窗'
import 下月工作重点模块 from '../components/下月工作重点/下月工作重点模块'
import 本月片区团队建设活动模块 from '../components/本月片区团队建设活动/本月片区团队建设活动模块'
import 本月片区团队建设活动弹窗 from '../components/本月片区团队建设活动/本月片区团队建设活动弹窗'
import 片区团队建设活动附件弹窗 from '../components/片区团队建设活动附件/片区团队建设活动附件弹窗'
import 片区团队建设活动附件模块 from '../components/片区团队建设活动附件/片区团队建设活动附件模块'

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
    sectionId: '本月片区人力资源调配',
    sectionTitle: '本月片区人力资源调配',
    modalTitle: '编辑本月片区人力资源调配',
    data: {},
    section: 本月片区人力资源调配模块,
    modal: 本月片区人力资源调配弹窗,
    modalWidth: 900
  },
  {
    sectionId: '本月片区不良事件汇总表',
    sectionTitle: '本月片区不良事件汇总表',
    modalTitle: '编辑本月片区不良事件汇总表',
    data: {},
    section: 本月片区不良事件汇总表模块,
    modal: 本月片区不良事件汇总表弹窗,
    modalWidth: 900
  },
  {
    sectionId: '本月护理质量检查问题及持续改进',
    sectionTitle: '本月护理质量检查问题及持续改进',
    modalTitle: '编辑本月护理质量检查问题及持续改进',
    data: {},
    section: 本月护理质量检查问题及持续改进模块,
    modal: 本月护理质量检查问题及持续改进弹窗,
    modalWidth: 900
  },
  {
    sectionId: '下月工作重点',
    sectionTitle: '下月工作重点',
    modalTitle: '编辑下月工作重点',
    data: {},
    section: 下月工作重点模块,
    modal: 下月工作重点弹窗,
    modalWidth: 900
  },
  {
    sectionId: '本月片区团队建设活动',
    sectionTitle: '本月片区团队建设活动',
    modalTitle: '编辑本月片区团队建设活动',
    data: {},
    section: 本月片区团队建设活动模块,
    modal: 本月片区团队建设活动弹窗
  },
  {
    sectionId: '片区团队建设活动附件',
    sectionTitle: '片区团队建设活动附件',
    modalTitle: '编辑片区团队建设活动附件',
    data: {},
    section: 片区团队建设活动附件模块,
    modal: 片区团队建设活动附件弹窗
  }
]
