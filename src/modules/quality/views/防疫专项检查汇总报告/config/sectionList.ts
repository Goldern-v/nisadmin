import { SectionListItem } from '../ReportViewModal'
import Line from '../components/common/Line'
// import 上月质量问题弹窗 from '../components/上月质量问题/上月质量问题弹窗'
// import 上月质量问题模块 from '../components/上月质量问题/上月质量问题模块'
import 本周检查扣分情况弹窗 from '../components/本周检查扣分情况/本周检查扣分情况弹窗'
import 本周检查扣分情况模块 from '../components/本周检查扣分情况/本周检查扣分情况模块'
import 质量扣分比较弹窗 from '../components/质量扣分比较/质量扣分比较弹窗'
import 质量扣分比较模块 from '../components/质量扣分比较/质量扣分比较模块'
import 本周防疫专项检查扣分科室排序模块 from '../components/本周防疫专项检查扣分科室排序/本周防疫专项检查扣分科室排序模块'
import 本周防疫专项检查扣分科室排序弹窗 from '../components/本周防疫专项检查扣分科室排序/本周防疫专项检查扣分科室排序弹窗'
import 本周主要防疫专项检查问题反馈模块 from '../components/本周主要防疫专项检查问题反馈/本周主要防疫专项检查问题反馈模块'
import 本周主要防疫专项检查问题反馈弹窗 from '../components/本周主要防疫专项检查问题反馈/本周主要防疫专项检查问题反馈弹窗'
import 本月质量检查亮点模块 from '../components/本月质量检查亮点/本月质量检查亮点模块'
import 本月质量检查亮点弹窗 from '../components/本月质量检查亮点/本月质量检查亮点弹窗'
import 重点问题模块 from '../components/重点问题/重点问题模块'
import 重点问题弹窗 from '../components/重点问题/重点问题弹窗'
import 持续改进模块 from '../components/持续改进/持续改进模块'
import 持续改进弹窗 from '../components/持续改进/持续改进弹窗'
import 追踪督导模块 from '../components/追踪督导/追踪督导模块'
import 追踪督导弹窗 from '../components/追踪督导/追踪督导弹窗'
import 检查重点模块 from '../components/检查重点/检查重点模块'
import 检查重点弹窗 from '../components/检查重点/检查重点弹窗'
import 问题及建议弹窗 from '../components/问题及建议/问题及建议弹窗'
import 问题及建议模块 from '../components/问题及建议/问题及建议模块'
import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 本周防疫专项检查整改措施模块 from '../components/本周防疫专项检查整改措施/本周防疫专项检查整改措施模块'
import 本周防疫专项检查整改措施弹窗 from '../components/本周防疫专项检查整改措施/本周防疫专项检查整改措施弹窗'

import 查房内容弹窗 from '../components/查房内容/查房内容弹窗'
import 查房内容模块 from '../components/查房内容/查房内容模块'
import 检查形式弹窗 from '../components/检查形式/检查形式弹窗'
import 检查形式模块 from '../components/检查形式/检查形式模块'

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
    section: Line
  },
  {
    sectionId: '查房内容',
    sectionTitle: '查房内容',
    modalTitle: '编辑查房内容',
    data: {},
    section: 查房内容模块,
    modal: 查房内容弹窗
  },
  {
    sectionId: '检查形式',
    sectionTitle: '检查形式',
    modalTitle: '编辑检查形式',
    data: {},
    section: 检查形式模块,
    modal: 检查形式弹窗
  },
  {
    sectionId: '本月质量检查亮点',
    sectionTitle: '本月质量检查亮点',
    modalTitle: '编辑本月质量检查亮点',
    data: {},
    section: 本月质量检查亮点模块,
    modal: 本月质量检查亮点弹窗
  },
  // {
  //   sectionId: '上月质量问题',
  //   sectionTitle: '一、上周防疫专项检查问题，持续改进效果评价',
  //   modalTitle: '编辑上周防疫专项检查问题',
  //   data: {},
  //   section: 上月质量问题模块,
  //   modal: 上月质量问题弹窗
  // },
  {
    section: Line
  },
  {
    sectionId: '本周检查扣分情况',
    sectionTitle: '二、本周检查扣分情况',
    modalTitle: '编辑本周检查扣分情况',
    data: {},
    section: 本周检查扣分情况模块,
    modal: 本周检查扣分情况弹窗
  },
  {
    sectionId: '质量扣分比较',
    sectionTitle: '质量扣分比较',
    modalTitle: '编辑检查扣分比较',
    data: {},
    section: 质量扣分比较模块,
    modal: 质量扣分比较弹窗
  },
  {
    sectionId: '本周防疫专项检查扣分科室排序',
    sectionTitle: '本周防疫专项检查扣分科室排序',
    modalTitle: '编辑本周防疫专项检查扣分科室排序',
    modalWidth: 900,
    data: {},
    section: 本周防疫专项检查扣分科室排序模块,
    modal: 本周防疫专项检查扣分科室排序弹窗
  },
  {
    sectionId: '本周主要防疫专项检查问题反馈',
    sectionTitle: '本周主要防疫专项检查问题反馈',
    modalTitle: '编辑本周主要防疫专项检查问题反馈',
    data: {},
    section: 本周主要防疫专项检查问题反馈模块,
    modal: 本周主要防疫专项检查问题反馈弹窗
  },
  {
    sectionId: '本周防疫专项检查整改措施',
    sectionTitle: '本周防疫专项检查整改措施',
    modalTitle: '编辑本周防疫专项检查整改措施',
    data: {},
    section: 本周防疫专项检查整改措施模块,
    modal: 本周防疫专项检查整改措施弹窗
  },
  {
    sectionId: '重点问题',
    sectionTitle: '重点问题',
    modalTitle: '编辑重点问题',
    data: {},
    section: 重点问题模块,
    modal: 重点问题弹窗
  },
  {
    sectionId: '持续改进',
    sectionTitle: '持续改进',
    modalTitle: '编辑持续改进',
    data: {},
    section: 持续改进模块,
    modal: 持续改进弹窗
  },
  {
    sectionId: '追踪督导',
    sectionTitle: '追踪督导',
    modalTitle: '编辑追踪督导',
    data: {},
    section: 追踪督导模块,
    modal: 追踪督导弹窗
  },
  {
    sectionId: '检查重点',
    sectionTitle: '检查重点',
    modalTitle: '编辑检查重点',
    data: {},
    section: 检查重点模块,
    modal: 检查重点弹窗
  },
  {
    sectionId: '问题及建议',
    sectionTitle: '问题及建议',
    modalTitle: '编辑问题及建议',
    data: {},
    section: 问题及建议模块,
    modal: 问题及建议弹窗
  }
]
