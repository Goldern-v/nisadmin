const columns: any = [
  {
    title: '序号',


    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '护理单元',
    dataIndex: '护理单元',
    key: '护理单元',
    width: 180,
    align: 'left'
  },
  {
    title: '急救设备器材及药品总件数',
    dataIndex: '急救设备器材及药品总件数',
    key: '急救设备器材及药品总件数',
    width: 200,
    align: 'center'
  },
  {
    title: '急救设备器材及药品不合格件数',
    dataIndex: '急救设备器材及药品不合格件数',
    key: '急救设备器材及药品不合格件数',
    width: 200,
    align: 'center'
  },
  {
    title: '错误发生率(%)',
    dataIndex: '错误发生率(%)',
    key: '错误发生率(%)',
    width: 180,
    align: 'center'
  },
  {
    title: '患者使用药物错误的发生例次/月',
    dataIndex: '患者使用药物错误的发生例次/月',
    key: '患者使用药物错误的发生例次/月',
    width: 200,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    急救设备器材及药品总件数: 6,
    急救设备器材及药品不合格件数: 0,
    '错误发生率(%)': 0,
    '患者使用药物错误的发生例次/月': 3
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    急救设备器材及药品总件数: 8,
    急救设备器材及药品不合格件数: 0,
    '错误发生率(%)': 0,
    '患者使用药物错误的发生例次/月': 2
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    急救设备器材及药品总件数: 15,
    急救设备器材及药品不合格件数: 3,
    '错误发生率(%)': 33.33,
    '患者使用药物错误的发生例次/月': 6
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    急救设备器材及药品总件数: 10,
    急救设备器材及药品不合格件数: 1,
    '错误发生率(%)': 10,
    '患者使用药物错误的发生例次/月': 2
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    急救设备器材及药品总件数: 18,
    急救设备器材及药品不合格件数: 2,
    '错误发生率(%)': 9,
    '患者使用药物错误的发生例次/月': 3
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    急救设备器材及药品总件数: 25,
    急救设备器材及药品不合格件数: 2,
    '错误发生率(%)': 7,
    '患者使用药物错误的发生例次/月': 4
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    急救设备器材及药品总件数: 10,
    急救设备器材及药品不合格件数: 2,
    '错误发生率(%)': 20,
    '患者使用药物错误的发生例次/月': 1
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    急救设备器材及药品总件数: 10,
    急救设备器材及药品不合格件数: 1,
    '错误发生率(%)': '10',
    '患者使用药物错误的发生例次/月': 5
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    急救设备器材及药品总件数: 12,
    急救设备器材及药品不合格件数: 1,
    '错误发生率(%)': 8,
    '患者使用药物错误的发生例次/月': 2
  },
  {
    key: 10,
    护理单元: '合计',
    急救设备器材及药品总件数: 112,
    急救设备器材及药品不合格件数: 9,
    '错误发生率(%)': 9,
    '患者使用药物错误的发生例次/月': 5
  }
]

export const 使用药物错误的发生率 = { dataSource, columns }
