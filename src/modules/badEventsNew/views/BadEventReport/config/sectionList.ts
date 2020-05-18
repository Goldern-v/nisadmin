import { SectionListItem } from '../BadEventReportModel'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 不良事件分类模块 from '../components/不良事件分类/不良事件分类模块'
import 不良事件分类弹窗 from '../components/不良事件分类/不良事件分类弹窗'
import 上报例数比较模块 from '../components/上报例数比较/上报例数比较模块'
import 上报例数比较弹窗 from '../components/上报例数比较/上报例数比较模块'

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
    sectionTitle: '不良事件分类',
    modalTitle: '编辑上报例数比较',
    modalWidth: 1000,
    data: {},
    section: 上报例数比较模块,
    modal: 上报例数比较弹窗
  },
  // {
  //   sectionId: '护理工作计划',
  //   sectionTitle: '护理工作计划',
  //   modalTitle: '编辑护理工作计划',
  //   data: {},
  //   section: 护理工作计划模块,
  //   modal: 护理工作计划弹窗
  // },
  // {
  //   sectionId: '病区护理质量检查',
  //   sectionTitle: '病区护理质量检查',
  //   modalTitle: '编辑病区护理质量检查',
  //   modalWidth: 800,
  //   data: {},
  //   section: 病区护理质量检查模块,
  //   modal: 病区护理质量检查弹窗
  // },
  // {
  //   sectionId: '护士会议记录',
  //   sectionTitle: '护士会议记录',
  //   modalTitle: '编辑护士会议记录',
  //   modalWidth: 600,
  //   data: {},
  //   section: 护士会议记录模块,
  //   modal: 护士会议记录弹窗
  // },
  // {
  //   sectionId: '人力资源调配',
  //   sectionTitle: '人力资源调配',
  //   modalTitle: '编辑人力资源调配',
  //   modalWidth: 800,
  //   data: {},
  //   section: 人力资源调配模块,
  //   modal: 人力资源调配弹窗
  // }
]
