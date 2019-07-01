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
    title: '患者人数',
    dataIndex: 'patient_count',
    key: '患者人数',
    width: 100,
    align: 'center'
  },
  {
    title: '呼吸机患者例数',
    dataIndex: 'venti_case',
    key: '呼吸机患者例数',
    width: 140,
    align: 'center'
  },
  {
    title: '呼吸机使用率',
    dataIndex: 'venti_ratio',
    key: '呼吸机使用率',
    width: 140,
    align: 'center'
  },
  {
    title: '感染例数',
    dataIndex: 'infection_case',
    key: '感染例数',
    width: 100,
    align: 'center'
  },
  {
    title: '留置导管总日数',
    dataIndex: 'venti_days',
    key: '留置导尿管总日数',
    width: 140,
    align: 'center'
  },
  {
    title: '感染率（例/千机械通气日）',
    dataIndex: 'infection_ratio',
    key: '感染率（例/千导管日）',
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    插管例数: 700,
    同期患者数: 600,
    留置导尿管使用率: '85.71%',
    感染例数: 8,
    留置导尿管总日数: 30,
    '感染率（例/千导管日）': '13.33‰',
    感染率: 13.33
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    插管例数: 731,
    同期患者数: 620,
    留置导尿管使用率: '81.23%',
    感染例数: 18,
    留置导尿管总日数: 12,
    '感染率（例/千导管日）': '12.21‰',
    感染率: 12.21
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    插管例数: 532,
    同期患者数: 610,
    留置导尿管使用率: '78.12%',
    感染例数: 23,
    留置导尿管总日数: 15,
    '感染率（例/千导管日）': '14.35‰',
    感染率: 14.35
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    插管例数: 431,
    同期患者数: 610,
    留置导尿管使用率: '56.13%',
    感染例数: 15,
    留置导尿管总日数: 35,
    '感染率（例/千导管日）': '12.12‰',
    感染率: 12.12
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    插管例数: 631,
    同期患者数: 810,
    留置导尿管使用率: '78.11%',
    感染例数: 17,
    留置导尿管总日数: 31,
    '感染率（例/千导管日）': '14.16‰',
    感染率: 14.16
  },
  {
    key: 6,
    护理单元: '产科护理单元',
    插管例数: 723,
    同期患者数: 912,
    留置导尿管使用率: '64.11%',
    感染例数: 14,
    留置导尿管总日数: 23,
    '感染率（例/千导管日）': '12.11‰',
    感染率: 12.11
  },
  {
    key: 7,
    护理单元: '关节外科护理单元',
    插管例数: 721,
    同期患者数: 911,
    留置导尿管使用率: '64.16%',
    感染例数: 14,
    留置导尿管总日数: 23,
    '感染率（例/千导管日）': '12.61‰',
    感染率: 12.61
  },
  {
    key: 8,
    护理单元: '创骨护理单元',
    插管例数: 744,
    同期患者数: 962,
    留置导尿管使用率: '67.16%',
    感染例数: 18,
    留置导尿管总日数: 26,
    '感染率（例/千导管日）': '17.23‰',
    感染率: 17.23
  },
  {
    key: 9,
    护理单元: '妇科护理单元',
    插管例数: 654,
    同期患者数: 874,
    留置导尿管使用率: '77.16%',
    感染例数: 12,
    留置导尿管总日数: 22,
    '感染率（例/千导管日）': '13.32‰',
    感染率: 13.32
  },
  {
    key: 10,
    护理单元: '合计',
    插管例数: 1566,
    同期患者数: 1896,
    留置导尿管使用率: '79.14%',
    感染例数: 18,
    留置导尿管总日数: 26,
    '感染率（例/千导管日）': '13.13‰',
    感染率: 13.13
  }
]

export const 呼吸机相关性肺炎发生率 = { dataSource, columns }
