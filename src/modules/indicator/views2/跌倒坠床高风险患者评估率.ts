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
    title: '跌倒/坠床高风险患者评估阳性例数',
    dataIndex: 'fall_count',
    key: '跌倒/坠床高风险患者评估阳性例数',
    width: 200,
    align: 'center'
  },
  {
    title: '入院时高风险患者总人数',
    dataIndex: 'hres_count',
    key: '入院时高风险患者总人数',
    width: 180,
    align: 'center'
  },
  {
    title: '评估率(%)',
    dataIndex: 'hres_ratio',
    key: '评估率(%)',
    width: 120,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 6,
    入院时高风险患者总人数: 0,

    '评估率(%)': 0
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 8,
    入院时高风险患者总人数: 0,
    '评估率(%)': 0
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 15,
    入院时高风险患者总人数: 3,
    '评估率(%)': 33.33
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 10,
    入院时高风险患者总人数: 1,
    '评估率(%)': 10
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 18,
    入院时高风险患者总人数: 2,
    '评估率(%)': 9
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 25,
    入院时高风险患者总人数: 2,
    '评估率(%)': 7
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 10,
    入院时高风险患者总人数: 2,
    '评估率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 10,
    入院时高风险患者总人数: 1,
    '评估率(%)': '10'
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    '跌倒/坠床高风险患者评估阳性例数': 12,
    入院时高风险患者总人数: 1,
    '评估率(%)': 8
  },
  {
    key: 10,
    护理单元: '合计',
    '跌倒/坠床高风险患者评估阳性例数': 112,
    入院时高风险患者总人数: 9,
    '评估率(%)': 9
  }
]

export const 跌倒坠床高风险患者评估率 = { dataSource, columns }
