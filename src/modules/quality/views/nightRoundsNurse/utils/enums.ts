const MONTH_LIST = [
  { 
    name: '一月',
    code: 'Jan'
  },
  { 
    name: '二月',
    code: 'Feb'
  },
  { 
    name: '三月',
    code: 'Mar'
  },
  { 
    name: '四月',
    code: 'Apr'
  },
  { 
    name: '五月',
    code: 'May'
  },
  { 
    name: '六月',
    code: 'Jun'
  },
  { 
    name: '七月',
    code: 'Jul'
  },
  { 
    name: '八月',
    code: 'Aug'
  },
  { 
    name: '九月',
    code: 'Sep'
  },
  { 
    name: '十月',
    code: 'Oct'
  },
  { 
    name: '十一月',
    code: 'Nov'
  },
  { 
    name: '十二月',
    code: 'Dec'
  },
]
export const CONFIGS = {
  1: {
    title: '二值护士评分汇总',
    tableTitle: '二值护士夜查房月度评分表',
    createTitle: '创建二值护士月度评分表',
    columns: [
      {
        title: '科室/月份',
        dataIndex: 'deptName',
        width: 100,
        align: "center",
      },
      ...MONTH_LIST.map(v => ({
        title: v.name,
        dataIndex: v.code,
        width: 60,
        align: 'center'
      })),
      {
        title: '平均分',
        dataIndex: 'avg',
        width: 60,
        align: "center",
      },
    ],
  },
  2: {
    title: '夜值班受表扬的护士名单',
    tableTitle: '夜值班受表扬的护士名单',
    createTitle: '创建受表扬护士名单',
    columns: [
      {
        title: '科室/月份',
        dataIndex: 'deptName',
        width: 110,
        align: "center",
      },
      ...MONTH_LIST.map(v => ({
        title: v.name,
        dataIndex: v.code,
        width: 65,
        align: 'center'
      })),
    ]
  }
}