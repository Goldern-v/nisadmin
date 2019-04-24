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
    align: 'center'
  },
  {
    title: '新生儿总人数',
    dataIndex: '新生儿总人数',
    key: '新生儿总人数',
    align: 'center'
  },
  {
    title: '烧伤烫伤例数',
    dataIndex: '烧伤烫伤例数',
    key: '烧伤烫伤例数',
    align: 'center'
  },
  {
    title: '发生率(%)',
    dataIndex: '发生率(%)',
    key: '发生率(%)',
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    新生儿总人数: 6,
    烧伤烫伤例数: 0,
    '发生率(%)': 0
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    新生儿总人数: 8,
    烧伤烫伤例数: 0,
    '发生率(%)': 0
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    新生儿总人数: 15,
    烧伤烫伤例数: 3,
    '发生率(%)': 33.33
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    新生儿总人数: 10,
    烧伤烫伤例数: 1,
    '发生率(%)': 10
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    新生儿总人数: 18,
    烧伤烫伤例数: 2,
    '发生率(%)': 9
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    新生儿总人数: 25,
    烧伤烫伤例数: 2,
    '发生率(%)': 7
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    新生儿总人数: 10,
    烧伤烫伤例数: 2,
    '发生率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    新生儿总人数: 10,
    烧伤烫伤例数: 1,
    '发生率(%)': '10'
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    新生儿总人数: 12,
    烧伤烫伤例数: 1,
    '发生率(%)': 8
  },
  {
    key: 10,
    护理单元: '合计',
    新生儿总人数: 112,
    烧伤烫伤例数: 9,
    '发生率(%)': 9
  }
]

export const 新生儿烧伤烫伤发生率 = { dataSource, columns }
