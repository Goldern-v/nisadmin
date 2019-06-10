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
    width: 150
  },

  {
    title: '统计周期天数',
    dataIndex: 'statPeriod',
    key: '统计周期天数',
    width: 150,
    align: 'center'
  },
  {
    title: '累计护理班次',
    dataIndex: 'tNurShifts',
    key: '累计护理班次',
    align: 'center',
    width: 150
  },
  {
    title: '累计护理时数',
    dataIndex: 'tNurHours',
    key: '累计护理时数',
    width: 150,
    align: 'center'
  },
  {
    title: '累计收治患者人次',
    dataIndex: 'tReceivePatients',
    key: '累计收治患者人次',
    width: 150,
    align: 'center'
  },
  {
    title: '平均每天护理时数',
    dataIndex: 'avgNurHours',
    key: '平均每天护理时数',
    width: 150,
    align: 'center'
  },
  {
    title: '平均每天住院患者',
    dataIndex: 'avgPatientCount',
    key: '平均每天住院患者',
    width: 150,
    align: 'center'
  },
  {
    title: '每住院患者24小时平均护理时数',
    dataIndex: 'avgNurHPerPatient',
    key: '每住院患者24小时平均护理时数',
    width: 150,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '五官科护理单元',
    统计周期天数: 30,
    累计护理班次: 385,
    累计护理时数: 3864.5,
    累计收治患者人次: 1321,
    平均每天护理时数: 128.82,
    平均每天住院患者: 44.03,
    每住院患者24小时平均护理时数: 1.83
  },
  {
    key: 2,
    护理单元: '关节护理单元',
    统计周期天数: 30,
    累计护理班次: 392,
    累计护理时数: 4432.5,
    累计收治患者人次: 2012,
    平均每天护理时数: 147.75,
    平均每天住院患者: 67.07,
    每住院患者24小时平均护理时数: 2.79
  },
  {
    key: 3,
    护理单元: '普外科护理单元',
    统计周期天数: 30,
    累计护理班次: 353,
    累计护理时数: 4210.2,
    累计收治患者人次: 1432,
    平均每天护理时数: 140.34,
    平均每天住院患者: 47.73,
    每住院患者24小时平均护理时数: 1.99
  },
  {
    key: 4,
    护理单元: '泌尿外科护理单元',
    统计周期天数: 30,
    累计护理班次: 376,
    累计护理时数: 3293.1,
    累计收治患者人次: 2231,
    平均每天护理时数: 109.77,
    平均每天住院患者: 74.37,
    每住院患者24小时平均护理时数: 3.1
  },
  {
    key: 5,
    护理单元: '创伤骨科护理单元',
    统计周期天数: 30,
    累计护理班次: 347,
    累计护理时数: 3823.4,
    累计收治患者人次: 3212,
    平均每天护理时数: 127.45,
    平均每天住院患者: 107.07,
    每住院患者24小时平均护理时数: 4.46
  },
  {
    key: 6,
    护理单元: '肾内科护理单元',
    统计周期天数: 30,
    累计护理班次: 365,
    累计护理时数: 4300.2,
    累计收治患者人次: 2512,
    平均每天护理时数: 143.34,
    平均每天住院患者: 83.73,
    每住院患者24小时平均护理时数: 3.49
  },
  {
    key: 7,
    护理单元: '脊柱科护理单元',
    统计周期天数: 30,
    累计护理班次: 347,
    累计护理时数: 4093.2,
    累计收治患者人次: 3102,
    平均每天护理时数: 136.44,
    平均每天住院患者: 103.4,
    每住院患者24小时平均护理时数: 4.31
  },
  {
    key: 8,
    护理单元: '呼吸科护理单元',
    统计周期天数: 30,
    累计护理班次: 403,
    累计护理时数: 4523.2,
    累计收治患者人次: 3112,
    平均每天护理时数: 150.77,
    平均每天住院患者: 107.07,
    每住院患者24小时平均护理时数: 4.46
  },
  {
    key: 9,
    护理单元: '儿科护理单元',
    统计周期天数: 30,
    累计护理班次: 393,
    累计护理时数: 4612.3,
    累计收治患者人次: 3421,
    平均每天护理时数: 153.74,
    平均每天住院患者: 114.03,
    每住院患者24小时平均护理时数: 4.75
  },
  {
    key: 10,
    护理单元: '新生儿科护理单元',
    统计周期天数: 30,
    累计护理班次: 342,
    累计护理时数: 4832.3,
    累计收治患者人次: 3521,
    平均每天护理时数: 161.08,
    平均每天住院患者: 117.37,
    每住院患者24小时平均护理时数: 4.89
  },
  {
    key: 11,
    护理单元: '心内科护理单元',
    统计周期天数: 30,
    累计护理班次: 376,
    累计护理时数: 4982.3,
    累计收治患者人次: 2341,
    平均每天护理时数: 132.74,
    平均每天住院患者: 78.03,
    每住院患者24小时平均护理时数: 3.25
  },
  {
    key: 12,
    护理单元: '产科护理单元',
    统计周期天数: 30,
    累计护理班次: 378,
    累计护理时数: 5102.3,
    累计收治患者人次: 4212,
    平均每天护理时数: 170.08,
    平均每天住院患者: 140.4,
    每住院患者24小时平均护理时数: 5.85
  },
  {
    key: 13,
    护理单元: '妇科护理单元',
    统计周期天数: 30,
    累计护理班次: 365,
    累计护理时数: 5313.4,
    累计收治患者人次: 4321,
    平均每天护理时数: 177.11,
    平均每天住院患者: 144.03,
    每住院患者24小时平均护理时数: 6
  },
  {
    key: 14,
    护理单元: '手术室',
    统计周期天数: 30,
    累计护理班次: 354,
    累计护理时数: 3823.2,
    累计收治患者人次: 1435,
    平均每天护理时数: 127.44,
    平均每天住院患者: 47.83,
    每住院患者24小时平均护理时数: 1.99
  }
]

export const 小时平均护理时数 = { dataSource, columns }
