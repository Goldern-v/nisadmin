const columns: any = [
  {
    title: '护理单元',
    dataIndex: '护理单元',
    key: '护理单元',
    align: 'center'
  },
  {
    title: '手术总人数',
    dataIndex: '手术总人数',
    key: '手术总人数',
    align: 'center'
  },
  {
    title: '发生压疮人数',
    dataIndex: '发生压疮人数',
    key: '发生压疮人数',
    align: 'center'
  },
  {
    title: '手术室压疮发生率(%)',
    dataIndex: '手术室压疮发生率(%)',
    key: '手术室压疮发生率(%)',
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    手术总人数: 6,
    发生压疮人数: 0,
    '发生率(%)': 0
  }
]

export const 住院患者手术室压疮发生率 = { dataSource, columns }
