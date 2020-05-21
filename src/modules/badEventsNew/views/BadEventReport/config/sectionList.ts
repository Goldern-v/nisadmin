import { SectionListItem } from '../BadEventReportModel'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'

import 不良事件分类模块 from '../components/不良事件分类/不良事件分类模块'
import 不良事件分类弹窗 from '../components/不良事件分类/不良事件分类弹窗'

import 上报例数比较模块 from '../components/上报例数比较/上报例数比较模块'
import 上报例数比较弹窗 from '../components/上报例数比较/上报例数比较弹窗'

import 上报趋势图模块 from '../components/上报趋势图/上报趋势图模块'
import 上报趋势图弹窗 from '../components/上报趋势图/上报趋势图弹窗'

import 上报情况比较模块 from '../components/上报情况比较/上报情况比较模块'
import 上报情况比较弹窗 from '../components/上报情况比较/上报情况比较弹窗'

import 上报情况比较图表模块 from '../components/上报情况比较图表/上报情况比较图表模块'
import 上报情况比较图表弹窗 from '../components/上报情况比较图表/上报情况比较图表弹窗'

import 不良事件分类比较模块 from '../components/不良事件分类比较/不良事件分类比较模块'
import 不良事件分类比较弹窗 from '../components/不良事件分类比较/不良事件分类比较弹窗'

import 伤害程度分类模块 from '../components/伤害程度分类/伤害程度分类模块'
import 伤害程度分类弹窗 from '../components/伤害程度分类/伤害程度分类弹窗'

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
    sectionId: '不良事件分类',
    sectionTitle: '不良事件分类',
    modalTitle: '编辑不良事件分类',
    modalWidth: 1000,
    data: {},
    section: 不良事件分类模块,
    modal: 不良事件分类弹窗
  },
  {
    sectionId: '上报例数比较',
    sectionTitle: '上报例数比较',
    modalTitle: '编辑上报例数比较',
    modalWidth: 1000,
    data: {},
    section: 上报例数比较模块,
    modal: 上报例数比较弹窗
  },
  {
    sectionId: '上报趋势图',
    sectionTitle: '上报趋势图',
    modalTitle: '编辑上报趋势图',
    modalWidth: 1000,
    data: {},
    section: 上报趋势图模块,
    modal: 上报趋势图弹窗
  },
  {
    sectionId: '上报情况比较',
    sectionTitle: '上报情况比较',
    modalTitle: '编辑上报情况比较',
    modalWidth: 1000,
    data: {},
    section: 上报情况比较模块,
    modal: 上报情况比较弹窗
  },
  {
    sectionId: '上报情况比较图表',
    sectionTitle: '上报情况比较图表',
    modalTitle: '编辑上报情况比较图表',
    modalWidth: 1000,
    data: {},
    section: 上报情况比较图表模块,
    modal: 上报情况比较图表弹窗
  },
  {
    sectionId: '不良事件分类比较',
    sectionTitle: '不良事件分类比较',
    modalTitle: '编辑不良事件分类比较',
    modalWidth: 1000,
    data: {},
    section: 不良事件分类比较模块,
    modal: 不良事件分类比较弹窗
  },
  {
    sectionId: '伤害程度分类',
    sectionTitle: '伤害程度分类',
    modalTitle: '编辑伤害程度分类',
    modalWidth: 1000,
    data: {},
    section: 伤害程度分类模块,
    modal: 伤害程度分类弹窗
  },
]
