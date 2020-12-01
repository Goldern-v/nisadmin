import { SectionListItem } from '../ReportPoolViewModal'
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
import 一级标题模块 from '../components/一级标题/一级标题模块'
import 统一标题列表模块 from '../components/统一标题列表/统一标题列表模块'
import 统一标题列表弹窗 from '../components/统一标题列表/统一标题列表弹窗'
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
    modalTitle: '编辑门诊治疗扣分排序',
    modalWidth: 800,
    data: {},
    section: 门诊科室质量扣分模块,
    modal: 门诊科室质量扣分弹窗
  },
  {
    sectionId: '4',
    sectionTitle: '四、各组质量问题反馈',
    data: {},
    section: 一级标题模块
  },
  {
    sectionId: '4_1',
    sectionTitle: '(一) 基础护理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑基础护理'
  },
  {
    sectionId: '4_2',
    sectionTitle: '(二) 中医特殊护理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑中医特殊护理'
  },
  {
    sectionId: '4_3',
    sectionTitle: '(三) 文件书写',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑文件书写'
  },
  {
    sectionId: '4_4',
    sectionTitle: '(四) 消毒隔离',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑消毒隔离'
  },
  {
    sectionId: '4_5',
    sectionTitle: '(五) 病区综合管理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑病区综合管理'
  },
  {
    sectionId: '4_6',
    sectionTitle: '(六) 病房综合质量',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑病房综合质量'
  },
  {
    sectionId: '4_7',
    sectionTitle: '(七) 护理文书',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑护理文书'
  },
  {
    sectionId: '4_8',
    sectionTitle: '(八) 特殊科室',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑特殊科室'
  },
  {
    sectionId: '4_9',
    sectionTitle: '(九) 门急诊检查',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑特殊科室'
  },
  {
    sectionId: '4_10',
    sectionTitle: '(十) 中医护理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑中医护理'
  },
  {
    sectionId: '4_11',
    sectionTitle: '(十一) 静脉治疗',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑中医护理'
  },
  {
    sectionId: '5',
    sectionTitle: '五、各组下一步整改措施',
    data: {},
    section: 一级标题模块
  },
  {
    sectionId: '5_1',
    sectionTitle: '(一) 基础护理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑基础护理'
  },
  {
    sectionId: '5_2',
    sectionTitle: '(二) 中医特殊护理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑中医特殊护理'
  },
  {
    sectionId: '5_3',
    sectionTitle: '(三) 文件书写',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑文件书写'
  },
  {
    sectionId: '5_4',
    sectionTitle: '(四) 消毒隔离',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑消毒隔离'
  },
  {
    sectionId: '5_5',
    sectionTitle: '(五) 病区综合管理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑病区综合管理'
  },
  {
    sectionId: '5_6',
    sectionTitle: '(六) 病房综合质量',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑病房综合质量'
  },
  {
    sectionId: '5_7',
    sectionTitle: '(七) 护理文书',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑护理文书'
  },
  {
    sectionId: '5_8',
    sectionTitle: '(八) 特殊科室',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑特殊科室'
  },
  {
    sectionId: '5_9',
    sectionTitle: '(九) 门急诊检查',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑特殊科室'
  },
  {
    sectionId: '5_10',
    sectionTitle: '(十) 中医护理',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑中医护理'
  },
  {
    sectionId: '5_11',
    sectionTitle: '(十一) 静脉治疗',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑中医护理'
  },
  {
    sectionId: '6',
    sectionTitle: '六、各组质量整改情况反馈',
    data: {},
    section: 一级标题模块
  },
  {
    sectionId: '6_1',
    sectionTitle: '',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑各组质量整改情况反馈'
  },
  {
    sectionId: '7',
    sectionTitle: '七、护理质量工作重点',
    data: {},
    section: 一级标题模块
  },
  {
    sectionId: '7_1',
    sectionTitle: '',
    data: {},
    section: 统一标题列表模块,
    modal: 统一标题列表弹窗,
    modalTitle: '编辑护理质量工作重点'
  }
]
