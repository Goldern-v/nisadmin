const columns: any = [
  {
    title: '护理单元',
    dataIndex: 'wardName',
    key: '护理单元',
    width: 180,
    align: 'left'
  },
  {
    title: '手术总人数',
    dataIndex: 'so_count',
    key: '手术总人数',
    width: 180,
    align: 'center'
  },
  {
    title: '发生压疮人数',
    dataIndex: 'pu_count',
    key: '发生压疮人数',
    width: 180,
    align: 'center'
  },
  {
    title: '手术室压疮发生率(%)',
    dataIndex: 'pu_ratio',
    key: '手术室压疮发生率(%)',
    width: 180,
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
