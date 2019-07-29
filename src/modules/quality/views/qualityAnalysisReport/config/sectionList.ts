import { SectionListItem } from '../QualityAnalysisReportViewModal'
import Line from '../components/common/Line'
import 上月质量问题弹窗 from '../components/上月质量问题/上月质量问题弹窗'
import 上月质量问题模块 from '../components/上月质量问题/上月质量问题模块'
import 本月质量检查扣分情况弹窗 from '../components/本月质量检查扣分情况/本月质量检查扣分情况弹窗'
import 本月质量检查扣分情况模块 from '../components/本月质量检查扣分情况/本月质量检查扣分情况模块'
import 质量扣分比较弹窗 from '../components/质量扣分比较/质量扣分比较弹窗'
import 质量扣分比较模块 from '../components/质量扣分比较/质量扣分比较模块'
import 本月质量扣分科室排序模块 from '../components/本月质量扣分科室排序/本月质量扣分科室排序模块'
import 本月质量扣分科室排序弹窗 from '../components/本月质量扣分科室排序/本月质量扣分科室排序弹窗'
import 本月主要质量问题模块 from '../components/本月主要质量问题/本月主要质量问题模块'
import 本月主要质量问题弹窗 from '../components/本月主要质量问题/本月主要质量问题弹窗'
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
    sectionId: '上月质量问题',
    sectionTitle: '一、上月质量问题，持续改进效果评价',
    modalTitle: '编辑上月质量问题',
    data: {},
    section: 上月质量问题模块,
    modal: 上月质量问题弹窗
  },
  {
    section: Line
  },
  {
    sectionId: '本月质量检查扣分情况',
    sectionTitle: '二、本月质量检查扣分情况',
    modalTitle: '编辑本月质量检查扣分情况',
    data: {},
    section: 本月质量检查扣分情况模块,
    modal: 本月质量检查扣分情况弹窗
  },
  {
    sectionId: '质量扣分比较',
    sectionTitle: '质量扣分比较',
    modalTitle: '编辑质量扣分比较',
    data: {},
    section: 质量扣分比较模块,
    modal: 质量扣分比较弹窗
  },
  {
    sectionId: '本月质量扣分科室排序',
    sectionTitle: '本月质量扣分科室排序',
    modalTitle: '编辑本月质量扣分科室排序',
    modalWidth: 900,
    data: {},
    section: 本月质量扣分科室排序模块,
    modal: 本月质量扣分科室排序弹窗
  },
  {
    sectionId: '本月主要质量问题',
    sectionTitle: '本月主要质量问题',
    modalTitle: '编辑本月主要质量问题',
    data: {},
    section: 本月主要质量问题模块,
    modal: 本月主要质量问题弹窗
  },
  {
    sectionId: '本月质量检查亮点',
    sectionTitle: '本月质量检查亮点',
    modalTitle: '编辑本月质量检查亮点',
    data: {},
    section: 本月质量检查亮点模块,
    modal: 本月质量检查亮点弹窗
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
