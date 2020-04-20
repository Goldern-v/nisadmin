const columns: any = [
  {
    title: '序号',


    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 30
  },
  {
    title: '统计项目',
    dataIndex: 'statItem',
    key: '统计项目',
    width: 200,
    align: 'left'
  },
  {
    title: '人数',
    dataIndex: 'value',
    key: '人数',
    width: 100,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    统计项目: '产伤的新生儿出院人数',
    人数: 3
  },
  {
    key: 2,
    统计项目: '同期活产儿人数',
    人数: 30
  },
  {
    key: 3,
    统计项目: '产伤新生儿占比',
    人数: 10
  },
  {
    key: 4,
    统计项目: '发生产伤的阴道分娩产妇出院人数',
    人数: 2
  },
  {
    key: 5,
    统计项目: '阴道分娩产妇出院人数',
    人数: 20
  },
  {
    key: 4,
    统计项目: '发生产伤的产妇占比',
    人数: 10
  }
]

export const 产科护理质量数据 = { dataSource, columns }
