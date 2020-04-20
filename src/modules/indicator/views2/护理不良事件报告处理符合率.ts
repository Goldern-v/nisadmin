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
    title: '检查总次数',
    dataIndex: '检查总次数',
    key: '检查总次数',
    width: 180,
    align: 'center'
  },
  {
    title: '不合格数',
    dataIndex: '不合格数',
    key: '不合格数',
    width: 180,
    align: 'center'
  },
  {
    title: '不合格率(%)',
    dataIndex: '不合格率(%)',
    key: '不合格率(%)',
    width: 180,
    align: 'center'
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '神经内科护理单元',
    检查总次数: 6,
    不合格数: 0,
    '不合格率(%)': 0
  },
  {
    key: 2,
    护理单元: '五官科护理单元',
    检查总次数: 8,
    不合格数: 0,
    '不合格率(%)': 0
  },
  {
    key: 3,
    护理单元: '神经外科护理单元',
    检查总次数: 15,
    不合格数: 3,
    '不合格率(%)': 33.33
  },
  {
    key: 4,
    护理单元: '肾内科护理单元',
    检查总次数: 10,
    不合格数: 1,
    '不合格率(%)': 10
  },
  {
    key: 5,
    护理单元: '泌尿外科护理单元',
    检查总次数: 18,
    不合格数: 2,
    '不合格率(%)': 9
  },
  {
    key: 6,
    护理单元: '妇科护理单元',
    检查总次数: 25,
    不合格数: 2,
    '不合格率(%)': 7
  },
  {
    key: 7,
    护理单元: '产科护理单元',
    检查总次数: 10,
    不合格数: 2,
    '不合格率(%)': 20
  },
  {
    key: 8,
    护理单元: '关节外科护理单元',
    检查总次数: 10,
    不合格数: 1,
    '不合格率(%)': '10'
  },
  {
    key: 9,
    护理单元: '创骨护理单元',
    检查总次数: 12,
    不合格数: 1,
    '不合格率(%)': 8
  },
  {
    key: 10,
    护理单元: '合计',
    检查总次数: 112,
    不合格数: 9,
    '不合格率(%)': 9
  }
]

export const 护理不良事件报告处理符合率 = { dataSource, columns }
