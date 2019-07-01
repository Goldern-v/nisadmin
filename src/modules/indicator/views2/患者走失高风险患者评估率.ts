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
    width:180,
    align: 'center'
  },
  {
    title: '走失高风险住院患者评估阳性数',
    dataIndex: 'lost_count',
    key: '走失高风险住院患者评估阳性数',
    width:180,
    align: 'center'
  },
  {
    title: '住院高风险患者例数',
    dataIndex: 'hres_count',
    key: '住院高风险患者例数',
    width:180,
    align: 'center'
  },
  {
    title: '评估率(%)',
    dataIndex: 'estimate_ratio',
    key: '评估率(%)',
    width:120,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    住院高风险患者例数: 6,
    走失高风险住院患者评估阳性数: 0,
    '评估率(%)': 0
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    住院高风险患者例数: 8,
    走失高风险住院患者评估阳性数: 0,
    '评估率(%)': 0
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    住院高风险患者例数: 15,
    走失高风险住院患者评估阳性数: 3,
    '评估率(%)': 33.33
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    住院高风险患者例数: 10,
    走失高风险住院患者评估阳性数: 1,
    '评估率(%)': 10
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    住院高风险患者例数: 18,
    走失高风险住院患者评估阳性数: 2,
    '评估率(%)': 9
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    住院高风险患者例数: 25,
    走失高风险住院患者评估阳性数: 2,
    '评估率(%)': 7
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    住院高风险患者例数: 10,
    走失高风险住院患者评估阳性数: 2,
    '评估率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    住院高风险患者例数: 10,
    走失高风险住院患者评估阳性数: 1,
    '评估率(%)': '10'
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    住院高风险患者例数: 12,
    走失高风险住院患者评估阳性数: 1,
    '评估率(%)': 8
  },
  {
    key: 10,
    护理单元: '合计',
    住院高风险患者例数: 112,
    走失高风险住院患者评估阳性数: 9,
    '评估率(%)': 9
  }
]

export const 患者走失高风险患者评估率 = { dataSource, columns }
