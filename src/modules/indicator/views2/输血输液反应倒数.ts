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
    width: 180
  },
  {
    title: '输血反应例数',
    dataIndex: 'btreact_count',
    key: '输血反应例数',
    width: 120,
    align: 'center'
  },
  {
    title: '输液反应例数',
    dataIndex: 'ifreact_count',
    key: '输液反应例数',
    width: 120,
    align: 'center'
  },
  {
    title: '小计',
    dataIndex: 'total',
    key: '小计',
    width: 120,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    输血反应例数: 2,
    输液反应例数: 10,
    小计: 12
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    输血反应例数: 2,
    输液反应例数: 8,
    小计: 10
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    输血反应例数: 3,
    输液反应例数: 15,
    小计: 18
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    输血反应例数: 4,
    输液反应例数: 10,
    小计: 14
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    输血反应例数: 6,
    输液反应例数: 18,
    小计: 24
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    输血反应例数: 5,
    输液反应例数: 25,
    小计: 30
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    输血反应例数: 2,
    输液反应例数: 10,
    小计: 12
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    输血反应例数: 1,
    输液反应例数: 10,
    小计: 11
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    输血反应例数: 1,
    输液反应例数: 10,
    小计: 11
  },
  {
    key: 10,
    护理单元: '合计',
    输血反应例数: 3,
    输液反应例数: 9,
    小计: 12
  }
]

export const 输血输液反应倒数 = { dataSource, columns }
