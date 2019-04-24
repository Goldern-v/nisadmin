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
    title: '静脉使用高危药物发生外渗的例数',
    dataIndex: '静脉使用高危药物发生外渗的例数',
    key: '静脉使用高危药物发生外渗的例数',
    align: 'center'
  },
  {
    title: '高风险患者总人数',
    dataIndex: '高风险患者总人数',
    key: '高风险患者总人数',
    align: 'center'
  },
  {
    title: '高危药物静脉外渗率',
    dataIndex: '高危药物静脉外渗率',
    key: '高危药物静脉外渗率',
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    静脉使用高危药物发生外渗的例数: 2,
    高风险患者总人数: 10,
    高危药物静脉外渗率: '20%',
    '外渗率(%)': 20
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    静脉使用高危药物发生外渗的例数: 2,
    高风险患者总人数: 8,
    高危药物静脉外渗率: '25‰',
    '外渗率(%)': 25
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    静脉使用高危药物发生外渗的例数: 3,
    高风险患者总人数: 15,
    高危药物静脉外渗率: '20‰',
    '外渗率(%)': 20
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    静脉使用高危药物发生外渗的例数: 4,
    高风险患者总人数: 10,
    高危药物静脉外渗率: '25‰',
    '外渗率(%)': 25
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    静脉使用高危药物发生外渗的例数: 6,
    高风险患者总人数: 18,
    高危药物静脉外渗率: '33.33‰',
    '外渗率(%)': 33.33
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    静脉使用高危药物发生外渗的例数: 5,
    高风险患者总人数: 25,
    高危药物静脉外渗率: '20‰',
    '外渗率(%)': 20
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    静脉使用高危药物发生外渗的例数: 2,
    高风险患者总人数: 10,
    高危药物静脉外渗率: '20‰',
    '外渗率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    静脉使用高危药物发生外渗的例数: 1,
    高风险患者总人数: 10,
    高危药物静脉外渗率: '10‰',
    '外渗率(%)': 10
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    静脉使用高危药物发生外渗的例数: 1,
    高风险患者总人数: 10,
    高危药物静脉外渗率: '10‰',
    '外渗率(%)': 10
  },
  {
    key: 10,
    护理单元: '合计',
    静脉使用高危药物发生外渗的例数: 3,
    高风险患者总人数: 9,
    高危药物静脉外渗率: '33‰',
    '外渗率(%)': 33
  }
]

export const 高危药物静脉外渗率 = { dataSource, columns }
