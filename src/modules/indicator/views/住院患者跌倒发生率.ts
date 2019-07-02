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
    align: 'left'
  },
  {
    title: '跌倒病例数',
    dataIndex: 'fall_count',
    key: '跌倒病例数',
    width: 120,
    align: 'center'
  },
  {
    title: '住院患者人日数',
    dataIndex: 'patient_days',
    key: '住院患者人日数',
    width: 140,
    align: 'center'
  },
  {
    title: '跌倒发生率/千床日',
    dataIndex: 'fall_ratio',
    key: '跌倒发生率/千床日',
    width: 180,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    跌倒病例数: 3,
    住院患者人日数: 54565,
    '跌倒发生率/千床日': '0.09‰',
    跌倒发生率: 0.09,
    离职率: 0.09
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    跌倒病例数: 2,
    住院患者人日数: 34563,
    '跌倒发生率/千床日': '0.08‰',
    跌倒发生率: 0.08,
    离职率: 0.08
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    跌倒病例数: 2,
    住院患者人日数: 2342,
    '跌倒发生率/千床日': '0.07‰',
    跌倒发生率: 0.07,
    离职率: 0.07
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    跌倒病例数: 2,
    住院患者人日数: 43242,
    '跌倒发生率/千床日': '0.05‰',
    跌倒发生率: 0.05,
    离职率: 0.07
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    跌倒病例数: 1,
    住院患者人日数: 23434,
    '跌倒发生率/千床日': '0.06‰',
    跌倒发生率: 0.06,
    离职率: 0.08
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    跌倒病例数: 1,
    住院患者人日数: 34322,
    '跌倒发生率/千床日': '0.07‰',
    跌倒发生率: 0.07,
    离职率: 0.07
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    跌倒病例数: 1,
    住院患者人日数: 53234,
    '跌倒发生率/千床日': '0.07‰',
    跌倒发生率: 0.07,
    离职率: 0.07
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    跌倒病例数: 1,
    住院患者人日数: 23423,
    '跌倒发生率/千床日': '0.09‰',
    跌倒发生率: 0.09,
    离职率: 0.09
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    跌倒病例数: 1,
    住院患者人日数: 33244,
    '跌倒发生率/千床日': '0.06‰',
    跌倒发生率: 0.06,
    离职率: 0.06
  },
  {
    key: 10,
    护理单元: '合计',
    跌倒病例数: 14,
    住院患者人日数: 542342,
    '跌倒发生率/千床日': '0.07‰',
    跌倒发生率: 0.07,
    离职率: 0.07
  }
]

export const 住院患者跌倒发生率 = { dataSource, columns }
