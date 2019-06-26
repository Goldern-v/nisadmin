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
    title: '导管留置日数',
    dataIndex: 'indwelling_days',
    key: '导管留置日数',
    align: 'center'
  },
  {
    title: 'UEX例数',
    dataIndex: 'uex_case',
    key: 'UEX例数',
    align: 'center'
  },
  {
    title: 'UEX发生率(例数/留置日数)',
    dataIndex: 'uex_ratio',
    key: 'UEX发生率(例数/留置日数)',
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    导管留置日数: 67,
    UEX例数: 2,
    'UEX发生率(例数/留置日数)': '2.99%',
    '发生率(%)': 2.99
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    导管留置日数: 45,
    UEX例数: 3,
    'UEX发生率(例数/留置日数)': '6.77%',
    '发生率(%)': 6.77
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    导管留置日数: 65,
    UEX例数: 1,
    'UEX发生率(例数/留置日数)': '1.54%',
    '发生率(%)': 1.54
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    导管留置日数: 456,
    UEX例数: 2,
    'UEX发生率(例数/留置日数)': '0.44%',
    '发生率(%)': 0.44
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    导管留置日数: 564,
    UEX例数: 2,
    'UEX发生率(例数/留置日数)': '0.36%',
    '发生率(%)': 0.36
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    导管留置日数: 45,
    UEX例数: 1,
    'UEX发生率(例数/留置日数)': '2.22%',
    '发生率(%)': 2.22
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    导管留置日数: 30,
    UEX例数: 1,
    'UEX发生率(例数/留置日数)': '3.33%',
    '发生率(%)': 3.33
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    导管留置日数: 44,
    UEX例数: 1,
    'UEX发生率(例数/留置日数)': '2.27%',
    '发生率(%)': 2.27
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    导管留置日数: 312,
    UEX例数: 3,
    'UEX发生率(例数/留置日数)': '0.96%',
    '发生率(%)': 0.96
  },
  {
    key: 10,
    护理单元: '合计',
    导管留置日数: 1628,
    UEX例数: 16,
    'UEX发生率(例数/留置日数)': '0.98%',
    '发生率(%)': 0.98
  }
]

export const 非计划拔管发生率 = { dataSource, columns }
