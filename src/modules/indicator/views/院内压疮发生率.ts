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
    align: 'center',
    width: 200
  },
  {
    title: '压疮病例数',
    dataIndex: 'pu_cases',
    key: '压疮病例数',
    width: 200,
    align: 'center'
  },
  {
    title: '同期患者数',
    dataIndex: 'patient_count',
    key: '同期患者数',
    width: 200,
    align: 'center'
  },
  {
    title: '压疮发生率(%)',
    dataIndex: 'pu_ratio',
    key: '压疮发生率(%)',
    width: 200,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '五官科护理单元',
    压疮病例数: 2,
    同期患者数: 60,
    '压疮发生率(%)': 3.33
  },
  {
    key: 2,
    护理单元: '关节护理单元',
    压疮病例数: 2,
    同期患者数: 40,
    '压疮发生率(%)': 2.5
  },
  {
    key: 3,
    护理单元: '普外护理单元',
    压疮病例数: 2,
    同期患者数: 76,
    '压疮发生率(%)': 1.31
  },
  {
    key: 4,
    护理单元: '泌尿外科护理单元',
    压疮病例数: 1,
    同期患者数: 88,
    '压疮发生率(%)': 1.31
  },
  {
    key: 5,
    护理单元: '创骨护理单元',
    压疮病例数: 1,
    同期患者数: 56,
    '压疮发生率(%)': 1.78
  },
  {
    key: 6,
    护理单元: '产科护理单元',
    压疮病例数: 1,
    同期患者数: 56,
    '压疮发生率(%)': 1.78
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    压疮病例数: 0,
    同期患者数: 64,
    '压疮发生率(%)': 0
  },
  {
    key: 8,
    护理单元: '儿科护理单元',
    压疮病例数: 0,
    同期患者数: 90,
    '压疮发生率(%)': 0
  },
  {
    key: 9,
    护理单元: '呼吸科护理单元',
    压疮病例数: 0,
    同期患者数: 54,
    '压疮发生率(%)': 0
  },
  {
    key: 10,
    护理单元: '心内护理单元',
    压疮病例数: 0,
    同期患者数: 34,
    '压疮发生率(%)': 0
  },
  {
    key: 11,
    护理单元: '合计',
    压疮病例数: 0,
    同期患者数: 31,
    '压疮发生率(%)': 1.22
  }
]

export const 院内压疮发生率 = { dataSource, columns }
