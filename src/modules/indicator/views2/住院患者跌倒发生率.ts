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
    width: 180,
    align: 'center'
  },
  {
    title: '跌倒人次',
    dataIndex: 'fall_count',
    key: '跌倒人次',
    width: 180,
    align: 'center'
  },
  {
    title: '住院总人数',
    dataIndex: 'patient_count',
    key: '住院总人数',
    width: 180,
    align: 'center'
  },
  {
    title: '发生率(%)',
    dataIndex: 'accident_ratio',
    key: '发生率(%)',
    width: 180,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    住院总人数: 6,
    跌倒人次: 0,
    '发生率(%)': 0
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    住院总人数: 8,
    跌倒人次: 0,
    '发生率(%)': 0
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    住院总人数: 15,
    跌倒人次: 3,
    '发生率(%)': 33.33
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    住院总人数: 10,
    跌倒人次: 1,
    '发生率(%)': 10
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    住院总人数: 18,
    跌倒人次: 2,
    '发生率(%)': 9
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    住院总人数: 25,
    跌倒人次: 2,
    '发生率(%)': 7
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    住院总人数: 10,
    跌倒人次: 2,
    '发生率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    住院总人数: 10,
    跌倒人次: 1,
    '发生率(%)': '10'
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    住院总人数: 12,
    跌倒人次: 1,
    '发生率(%)': 8
  },
  {
    key: 10,
    护理单元: '合计',
    住院总人数: 112,
    跌倒人次: 9,
    '发生率(%)': 9
  }
]

export const 住院患者跌倒发生率2 = { dataSource, columns }
