const columns: any = [
  {
    title: '序号',


    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '护理单元',
    dataIndex: 'wardName',
    key: '护理单元',
    width: 180,
    align: 'left'
  },
  {
    title: '导管留置日数',
    dataIndex: 'indwelling_days',
    key: '导管留置日数',
    width: 140,
    align: 'center'
  },
  {
    title: 'UEX例数',
    dataIndex: 'uex_cases',
    key: 'UEX例数',
    width: 120,
    align: 'center'
  },
  {
    title: 'UEX发生率(例数/留置日数)',
    dataIndex: 'uex_ratio_byday',
    key: 'UEX发生率(例数/留置日数)',
    width: 180,
    align: 'center'
  },
  {
    title: '导管置管例数',
    dataIndex: 'indwelling_cases',
    width: 140,
    key: '导管置管例数',
    align: 'center'
  },
  {
    title: 'UEX发生率(例数/置管例数)',
    dataIndex: 'uex_ratio_bycase',
    key: 'uex_ratio_bycase',
    width: 180,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    导管留置日数: 375,
    UEX例数: 3,
    'UEX发生率(例数/留置日数)': '8.0‰',
    导管置管例数: 64,
    'UEX发生率(例数/置管例数)': '4.7%',
    UEX发生率: 4.7
  },
  {
    key: 2,
    护理单元: '神经外科护理单元',
    导管留置日数: 519,
    UEX例数: 1,
    'UEX发生率(例数/留置日数)': '1.9‰',
    导管置管例数: 99,
    'UEX发生率(例数/置管例数)': '1.0%',
    UEX发生率: 1
  },
  {
    key: 3,
    护理单元: '创伤骨科护理单元',
    导管留置日数: 205,
    UEX例数: 3,
    'UEX发生率(例数/留置日数)': '14.6‰',
    导管置管例数: 62,
    'UEX发生率(例数/置管例数)': '4.8%',
    UEX发生率: 4.8
  },
  {
    key: 4,
    护理单元: 'ICU护理单元',
    导管留置日数: 167,
    UEX例数: 1,
    'UEX发生率(例数/留置日数)': '0.5‰',
    导管置管例数: 48,
    'UEX发生率(例数/置管例数)': '2.1%',
    UEX发生率: 2.1
  }
]

export const 插管患者非计划拔管发生率 = { dataSource, columns }
