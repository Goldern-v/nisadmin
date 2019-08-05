import { SectionListItem } from '../QualityAnalysisReportPoolViewModal'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 查房内容弹窗 from '../components/查房内容/查房内容弹窗'
import 查房内容模块 from '../components/查房内容/查房内容模块'
import 检查形式弹窗 from '../components/检查形式/检查形式弹窗'
import 检查形式模块 from '../components/检查形式/检查形式模块'
import 亮点弹窗 from '../components/亮点/亮点弹窗'
import 亮点模块 from '../components/亮点/亮点模块'
import 本月总扣分弹窗 from '../components/本月总扣分/本月总扣分弹窗'
import 本月总扣分模块 from '../components/本月总扣分/本月总扣分模块'
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
    sectionId: '亮点',
    sectionTitle: '亮点',
    modalTitle: '编辑亮点',
    data: {},
    section: 亮点模块,
    modal: 亮点弹窗
  },
  {
    sectionId: '本月总扣分',
    sectionTitle: '本月总扣分',
    modalTitle: '编辑本月总扣分',
    modalWidth: 800,
    data: {},
    section: 本月总扣分模块,
    modal: 本月总扣分弹窗
  }
]
