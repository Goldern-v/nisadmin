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
import 扣分比较弹窗 from '../components/扣分比较/扣分比较弹窗'
import 扣分比较模块 from '../components/扣分比较/扣分比较模块'
import 病区质量考核前十弹窗 from '../components/病区质量考核前十/病区质量考核前十弹窗'
import 病区质量考核前十模块 from '../components/病区质量考核前十/病区质量考核前十模块'
import 病区质量扣分前十弹窗 from '../components/病区质量扣分前十/病区质量扣分前十弹窗'
import 病区质量扣分前十模块 from '../components/病区质量扣分前十/病区质量扣分前十模块'
import 特殊科室质量扣分弹窗 from '../components/特殊科室质量扣分/特殊科室质量扣分弹窗'
import 特殊科室质量扣分模块 from '../components/特殊科室质量扣分/特殊科室质量扣分模块'
import 特殊监护病房质量扣分弹窗 from '../components/特殊监护病房质量扣分/特殊监护病房质量扣分弹窗'
import 特殊监护病房质量扣分模块 from '../components/特殊监护病房质量扣分/特殊监护病房质量扣分模块'
import 门诊科室质量扣分弹窗 from '../components/门诊科室质量扣分/门诊科室质量扣分弹窗'
import 门诊科室质量扣分模块 from '../components/门诊科室质量扣分/门诊科室质量扣分模块'
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
  },
  {
    sectionId: '扣分比较',
    sectionTitle: '扣分比较',
    modalTitle: '编辑扣分比较',
    modalWidth: 800,
    data: {},
    section: 扣分比较模块,
    modal: 扣分比较弹窗
  },
  {
    sectionId: '病区质量考核前十',
    sectionTitle: '病区质量考核前十',
    modalTitle: '编辑病区质量考核前十的科室',
    modalWidth: 800,
    data: {},
    section: 病区质量考核前十模块,
    modal: 病区质量考核前十弹窗
  },
  {
    sectionId: '病区质量扣分前十',
    sectionTitle: '病区质量扣分前十',
    modalTitle: '编辑病区质量扣分前十的科室',
    modalWidth: 800,
    data: {},
    section: 病区质量扣分前十模块,
    modal: 病区质量扣分前十弹窗
  },
  {
    sectionId: '特殊科室质量扣分',
    sectionTitle: '特殊科室质量扣分',
    modalTitle: '编辑特殊科室质量扣分',
    modalWidth: 800,
    data: {},
    section: 特殊科室质量扣分模块,
    modal: 特殊科室质量扣分弹窗
  },
  {
    sectionId: '特殊监护病房质量扣分',
    sectionTitle: '特殊监护病房质量扣分',
    modalTitle: '编辑特殊监护病房质量扣分',
    modalWidth: 800,
    data: {},
    section: 特殊监护病房质量扣分模块,
    modal: 特殊监护病房质量扣分弹窗
  },
  {
    sectionId: '门诊科室质量扣分',
    sectionTitle: '门诊科室质量扣分',
    modalTitle: '编辑门诊科室质量扣分',
    modalWidth: 800,
    data: {},
    section: 门诊科室质量扣分模块,
    modal: 门诊科室质量扣分弹窗
  }
]
