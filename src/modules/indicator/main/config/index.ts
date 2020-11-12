export const defaultTableColumn: any[] = [
  {
    title: '序号',
    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '检测项目',
    dataIndex: 'indicatorName',
    key: 'indicatorName',
    align: 'center',
    width: 200
  },
  {
    title: '第一季度',
    children: [
      {
        title: '分子',
        dataIndex: 'firstNumerator',
        key: 'firstNumerator',
        align: 'center',
      },
      {
        title: '分母',
        dataIndex: 'firstDenominator',
        key: 'firstDenominator',
        align: 'center',
      },
      {
        title: '发生率',
        dataIndex: 'firstPercent',
        key: 'firstPercent',
        align: 'center',
      }
    ]
  },
  {
    title: '第二季度',
    children: [
      {
        title: '分子',
        dataIndex: 'secondNumerator',
        key: 'secondNumerator',
        align: 'center',
      },
      {
        title: '分母',
        dataIndex: 'secondDenominator',
        key: 'secondDenominator',
        align: 'center',
      },
      {
        title: '发生率',
        dataIndex: 'secondPercent',
        key: 'secondPercent',
        align: 'center',
      }
    ]
  },
  {
    title: '第三季度',
    children: [
      {
        title: '分子',
        dataIndex: 'thirdNumerator',
        key: 'thirdNumerator',
        align: 'center',
      },
      {
        title: '分母',
        dataIndex: 'thirdDenominator',
        key: 'thirdDenominator',
        align: 'center',
      },
      {
        title: '发生率',
        dataIndex: 'thirdPercent',
        key: 'thirdPercent',
        align: 'center',
      }
    ]
  },
  {
    title: '第四季度',
    children: [
      {
        title: '分子',
        dataIndex: 'fourthNumerator',
        key: 'fourthNumerator',
        align: 'center',
      },
      {
        title: '分母',
        dataIndex: 'fourthDenominator',
        key: 'fourthDenominator',
        align: 'center',
      },
      {
        title: '发生率',
        dataIndex: 'fourthPercent',
        key: 'fourthPercent',
        align: 'center',
      }
    ]
  },
  {
    title: '年度',
    children: [
      {
        title: '分子',
        dataIndex: 'yearNumerator',
        key: 'yearNumerator',
        align: 'center',
      },
      {
        title: '分母',
        dataIndex: 'yearDenominator',
        key: 'yearDenominator',
        align: 'center',
      },
      {
        title: '发生率',
        dataIndex: 'yearPercent',
        key: 'yearPercent',
        align: 'center',
      }
    ]
  },
]