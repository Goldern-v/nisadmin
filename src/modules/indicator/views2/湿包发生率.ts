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
    dataIndex: '护理单元',
    key: '护理单元',
    width:180,
    align: 'center'
  },
  {
    title: 'CSSD灭菌包总件数',
    dataIndex: 'CSSD灭菌包总件数',
    key: 'CSSD灭菌包总件数',
    width:180,
    align: 'center'
  },
  {
    title: '湿包件数',
    dataIndex: '湿包件数',
    key: '湿包件数',
    width:180,
    align: 'center'
  },
  {
    title: '湿包率(%)',
    dataIndex: '湿包率(%)',
    key: '湿包率(%)',
    width:120,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    CSSD灭菌包总件数: 6,
    湿包件数: 0,
    '湿包率(%)': 0
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    CSSD灭菌包总件数: 8,
    湿包件数: 0,
    '湿包率(%)': 0
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    CSSD灭菌包总件数: 15,
    湿包件数: 3,
    '湿包率(%)': 33.33
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    CSSD灭菌包总件数: 10,
    湿包件数: 1,
    '湿包率(%)': 10
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    CSSD灭菌包总件数: 18,
    湿包件数: 2,
    '湿包率(%)': 9
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    CSSD灭菌包总件数: 25,
    湿包件数: 2,
    '湿包率(%)': 7
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    CSSD灭菌包总件数: 10,
    湿包件数: 2,
    '湿包率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    CSSD灭菌包总件数: 10,
    湿包件数: 1,
    '湿包率(%)': '10'
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    CSSD灭菌包总件数: 12,
    湿包件数: 1,
    '湿包率(%)': 8
  },
  {
    key: 10,
    护理单元: '合计',
    CSSD灭菌包总件数: 112,
    湿包件数: 9,
    '湿包率(%)': 9
  }
]

export const 湿包发生率 = { dataSource, columns }
