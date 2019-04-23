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
    key: '护理单元'
  },
  {
    title: 'A班',
    children: [
      {
        title: '患者数',
        dataIndex: 'A班患者数',
        key: 'A班患者数'
      },
      {
        title: '护士数',
        dataIndex: 'A班护士数',
        key: 'A班护士数'
      },
      {
        title: '护患比',
        dataIndex: 'A班护患比',
        key: 'A班护患比'
      }
    ]
  },
  {
    title: 'P班',
    children: [
      {
        title: '患者数',
        dataIndex: 'P班患者数',
        key: 'P班患者数'
      },
      {
        title: '护士数',
        dataIndex: 'P班护士数',
        key: 'P班护士数'
      },
      {
        title: '护患比',
        dataIndex: 'P班护患比',
        key: 'P班护患比'
      }
    ]
  },
  {
    title: 'N班',
    children: [
      {
        title: '患者数',
        dataIndex: 'N班患者数',
        key: 'N班患者数'
      },
      {
        title: '护士数',
        dataIndex: 'N班护士数',
        key: 'N班护士数'
      },
      {
        title: '护患比',
        dataIndex: 'N班护患比',
        key: 'N班护患比'
      }
    ]
  },
  {
    title: '每天平均护患比',
    dataIndex: '每天平均护患比',
    key: '每天平均护患比'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '关节护理单元',
    患者数: 72,
    护士数: 72,
    A班患者数: 72,
    A班护士数: 23,
    A班护患比: 0.32,
    P班患者数: 0.4,
    P班护士数: 2,
    P班护患比: 2,
    N班患者数: 0.4,
    N班护士数: 2,
    N班护患比: 2,
    每天平均护患比: 2
  },
  {
    key: 1,
    护理单元: '关节护理单元2',
    患者数: 172,
    护士数: 172,
    A班患者数: 72,
    A班护士数: 23,
    A班护患比: 0.32,
    P班患者数: 0.4,
    P班护士数: 2,
    P班护患比: 2,
    N班患者数: 0.4,
    N班护士数: 2,
    N班护患比: 2,
    每天平均护患比: 3
  }
]

export const 护患比统计 = { dataSource, columns }
