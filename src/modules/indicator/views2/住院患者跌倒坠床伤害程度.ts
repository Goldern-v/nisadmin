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
    title: '跌倒例数',
    dataIndex: '跌倒例数',
    key: '跌倒例数',
    align: 'center'
  },
  {
    title: '轻度伤害',
    align: 'center',
    children: [
      {
        title: '例数',
        dataIndex: '轻度伤害例数',
        key: '轻度伤害例数',
        align: 'center'
      },
      {
        title: '占比',
        dataIndex: '轻度伤害占比',
        key: '轻度伤害占比',
        align: 'center'
      }
    ]
  },
  {
    title: '中度伤害',
    align: 'center',
    children: [
      {
        title: '例数',
        dataIndex: '中度伤害例数',
        key: '中度伤害例数',
        align: 'center'
      },
      {
        title: '占比',
        dataIndex: '中度伤害占比',
        key: '中度伤害占比',
        align: 'center'
      }
    ]
  },
  {
    title: '高度伤害',
    align: 'center',
    children: [
      {
        title: '例数',
        dataIndex: '高度伤害例数',
        key: '高度伤害例数',
        align: 'center'
      },
      {
        title: '占比',
        dataIndex: '高度伤害占比',
        key: '高度伤害占比',
        align: 'center'
      }
    ]
  },
  {
    title: '死亡伤害',
    align: 'center',
    children: [
      {
        title: '例数',
        dataIndex: '死亡伤害例数',
        key: '死亡伤害例数',
        align: 'center'
      },
      {
        title: '占比',
        dataIndex: '死亡伤害占比',
        key: '死亡伤害占比',
        align: 'center'
      }
    ]
  }
]

const dataSource: any = []

export const 住院患者跌倒坠床伤害程度 = { dataSource, columns }
