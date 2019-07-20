import { SectionListItem } from '../QualityAnalysisReportViewModal'

export const sectionList: SectionListItem[] = [
  {
    sectionId: 'title',
    sectionComponentId: 'title',
    sectionTitle: 'title',
    modalTitle: '报告名称',
    data: {
      text: '2019年3月份XXXXXXXX表单分析报告'
    }
  },
  {
    sectionComponentId: 'line'
  },
  {
    sectionId: '上月质量问题',
    sectionComponentId: 'titleTextarea',
    sectionTitle: '一、上月质量问题，持续改进效果评价',
    modalTitle: '编辑上月质量问题',
    data: {
      textarea: `A:落实效果好  B:部分落实  C:未落实    评价B或C应进入下一阶段持续改进）
                 1.输液三签的落实  A
                 2.吸氧管道的管理  B`
    }
  },
  {
    sectionComponentId: 'line'
  },
  {
    sectionId: '本月质量检查扣分情况',
    sectionComponentId: 'titleTextarea',
    sectionTitle: '二、本月质量检查扣分情况',
    modalTitle: '编辑本月质量检查扣分情况',
    data: {
      textarea: `2019年3月对外科楼13个病区综合质量进行检查。`
    }
  },
  {
    sectionId: '2019年3月与2019年2月质量扣分比',
    sectionComponentId: 'chartTable',
    sectionTitle: '2.1.2019年3月与2019年2月质量扣分比',
    modalTitle: '扣分情况',
    data: {
      tableData: {
        二月: [
          {
            name: '扣分科室',
            score: 3
          },
          {
            name: '组织管理',
            score: 4
          },
          {
            name: '基护管理',
            score: 5
          }
        ],
        三月: [
          {
            name: '扣分科室',
            score: 6
          },
          {
            name: '组织管理',
            score: 9
          },
          {
            name: '基护管理',
            score: 8
          }
        ]
      }
    }
  }
]
