import { SectionListItem } from '../QualityAnalysisReportViewModal'
import Line from '../components/common/Line'

import 标题模块 from '../components/标题/标题模块'
import 标题弹窗 from '../components/标题/标题弹窗'
import 数据概况模块 from '../components/数据概况/数据概况模块'
import 数据概况弹窗 from '../components/数据概况/数据概况弹窗'
import 数据分析弹窗 from '../components/数据分析/数据分析弹窗'
import 数据分析模块 from '../components/数据分析/数据分析模块'
import 数据统计模块 from '../components/数据统计/数据统计模块'
import 数据统计弹窗 from '../components/数据统计/数据统计弹窗'
import 月度趋势弹窗 from '../components/月度趋势/月度趋势弹窗'
import 月度趋势模块 from '../components/月度趋势/月度趋势模块'
import 科室排名模块 from '../components/科室排名/科室排名模块'
import 科室排名弹窗 from '../components/科室排名/科室排名弹窗'
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
    sectionId: '数据概况',
    sectionTitle: '数据概况',
    modalTitle: '编辑数据概况',
    data: {},
    section: 数据概况模块,
    modal: 数据概况弹窗
  },
  {
    sectionId: '数据分析',
    sectionTitle: '数据分析',
    modalTitle: '编辑数据分析',
    data: {},
    section: 数据分析模块,
    modal: 数据分析弹窗
  },
  {
    sectionId: '数据统计',
    sectionTitle: '数据统计',
    modalTitle: '编辑数据统计',
    modalWidth: 800,
    data: {},
    section: 数据统计模块,
    modal: 数据统计弹窗
  },
  {
    sectionId: '月度趋势',
    sectionTitle: '月度趋势',
    modalTitle: '编辑月度趋势',
    data: {},
    section: 月度趋势模块,
    modal: 月度趋势弹窗
  },
  {
    sectionId: '科室排名',
    sectionTitle: '科室排名',
    modalTitle: '编辑科室排名',
    data: {},
    section: 科室排名模块,
    modal: 科室排名弹窗
  }
]
