const columns: any = [
  {
    title: '序号',
    dataIndex: '1',
    key: '1',
    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '护理单元',
    dataIndex: 'wardName',
    key: '护理单元',
    align: 'center'
  },
  {
    title: '插管总日数',
    dataIndex: 'indwelling_days',
    key: '插管总日数',
    align: 'center'
  },
  {
    title: '感染人数',
    dataIndex: 'infection_count',
    key: '感染人数',
    align: 'center'
  },
  {
    title: '发生率(%)',
    dataIndex: 'accident_ratio',
    key: '发生率(%)',
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    插管总日数: 6,
    感染人数: 0,
    '发生率(%)': 0
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    插管总日数: 8,
    感染人数: 0,
    '发生率(%)': 0
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    插管总日数: 15,
    感染人数: 3,
    '发生率(%)': 33.33
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    插管总日数: 10,
    感染人数: 1,
    '发生率(%)': 10
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    插管总日数: 18,
    感染人数: 2,
    '发生率(%)': 9
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    插管总日数: 25,
    感染人数: 2,
    '发生率(%)': 7
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    插管总日数: 10,
    感染人数: 2,
    '发生率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    插管总日数: 10,
    感染人数: 1,
    '发生率(%)': '10'
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    插管总日数: 12,
    感染人数: 1,
    '发生率(%)': 8
  },
  {
    key: 10,
    护理单元: '合计',
    插管总日数: 112,
    感染人数: 9,
    '发生率(%)': 9
  }
]

export const 导管相关血液感染发生率 = { dataSource, columns }
