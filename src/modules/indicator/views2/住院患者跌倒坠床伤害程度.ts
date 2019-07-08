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
    width: 140,
    align: 'left'
  },
  {
    title: '跌倒例数',
    dataIndex: 'total_count',
    key: '跌倒例数',
    width: 80,
    align: 'center'
  },
  {
    title: '轻度伤害',
    align: 'center',
    children: [
      {
        title: '轻度伤害例数',
        dataIndex: 'minor_injury_count',
        key: '轻度伤害例数',
        width: 70,
        align: 'center'
      },
      {
        title: '轻度伤害比例',
        dataIndex: 'minor_injury_ratio',
        key: '轻度伤害占比',
        width: 70,
        align: 'center'
      }
    ]
  },
  {
    title: '中度伤害',
    align: 'center',
    children: [
      {
        title: '中度伤害例数',
        dataIndex: 'moderate_injury_count',
        key: '中度伤害例数',
        width: 70,
        align: 'center'
      },
      {
        title: '中度伤害比例',
        dataIndex: 'moderate_injury_ratio',
        key: '中度伤害占比',
        width: 70,
        align: 'center'
      }
    ]
  },
  {
    title: '高度伤害',
    align: 'center',
    children: [
      {
        title: '高度伤害例数',
        dataIndex: 'severe_injury_count',
        key: '高度伤害例数',
        width: 70,
        align: 'center'
      },
      {
        title: '高度伤害比例',
        dataIndex: 'severe_injury_ratio',
        key: '高度伤害占比',
        width: 70,
        align: 'center'
      }
    ]
  },
  {
    title: '死亡伤害',
    align: 'center',
    children: [
      {
        title: '死亡伤害例数',
        dataIndex: 'dead_injury_count',
        key: '死亡伤害例数',
        width: 70,
        align: 'center'
      },
      {
        title: '死亡伤害比例',
        dataIndex: 'dead_injury_ratio',
        key: '死亡伤害占比',
        width: 70,
        align: 'center'
      }
    ]
  }
]

const dataSource: any = []

export const 住院患者跌倒坠床伤害程度 = { dataSource, columns }
