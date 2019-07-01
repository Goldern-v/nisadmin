const columns: any = [
  {
    title: '统计项目',
    dataIndex: 'statItem',
    key: '统计项目',
    align: 'center',
    width: 180,
    colSpan: 2,
    render: (value: any, row: any, index: number) => {
      const obj: any = {
        children: value,
        props: {}
      }

      if (index === 0) {
        obj.props.rowSpan = 3
      }
      if (index === 1) {
        obj.props.rowSpan = 0
      }
      if (index === 2) {
        obj.props.rowSpan = 0
      }
      if (index === 3) {
        obj.props.rowSpan = 2
      }
      if (index === 4) {
        obj.props.rowSpan = 0
      }
      if (index === 5) {
        obj.props.rowSpan = 3
      }
      if (index === 6) {
        obj.props.rowSpan = 0
      }
      if (index === 7) {
        obj.props.rowSpan = 0
      }
      if (index === 8) {
        obj.props.rowSpan = 2
      }
      if (index === 9) {
        obj.props.rowSpan = 0
      }
      if (index === 10) {
        obj.props.rowSpan = 2
      }
      if (index === 11) {
        obj.props.rowSpan = 0
      }
      if (index === 12) {
        obj.props.colSpan = 2
      }
      return obj
    }
  },
  {
    title: 'item',
    colSpan: 0,
    width: 100,
    dataIndex: 'category',
    render: (value: any, row: any, index: number) => {
      const obj: any = {
        children: value,
        props: {}
      }
      if (index === 12) {
        obj.props.colSpan = 0
      }
      return obj
    }
  },
  {
    title: '统计周期内离职人数',
    dataIndex: 'resign_count',
    key: '统计周期内离职人数',
    width: 100,
    align: 'center'
  },
  {
    title: '统计周期末在职人数',
    dataIndex: 'payroll_count',
    key: '统计周期末在职人数',
    width: 100,
    align: 'center'
  },
  {
    title: '统计周期末在职人数+统计周期内离职人数',
    dataIndex: 'total_count',
    key: '统计周期末在职人数+统计周期内离职人数',
    width: 100,
    align: 'center'
  },
  {
    title: '离职率(%)',
    dataIndex: 'resign_ratio',
    key: '离职率(%)',
    align: 'center',
    width: 100
  }
]

const dataSource = [
  {
    key: 1,
    统计项目: '21-30岁',
    统计周期内离职人数: 61,
    统计周期末在职人数: 716,
    '统计周期末在职人数+统计周期内离职人数': 777,
    '离职率(%)': 7.85
  },
  {
    key: 2,
    统计项目: '31-40岁',
    统计周期内离职人数: 3,
    统计周期末在职人数: 318,
    '统计周期末在职人数+统计周期内离职人数': 321,
    '离职率(%)': 0.93
  },
  {
    key: 3,
    统计项目: '41岁及以上',
    统计周期内离职人数: 2,
    统计周期末在职人数: 126,
    '统计周期末在职人数+统计周期内离职人数': 128,
    '离职率(%)': 1.56
  },
  {
    key: 4,
    统计项目: '男',
    统计周期内离职人数: 8,
    统计周期末在职人数: 100,
    '统计周期末在职人数+统计周期内离职人数': 108,
    '离职率(%)': 7.41
  },
  {
    key: 5,
    统计项目: '女',
    统计周期内离职人数: 58,
    统计周期末在职人数: 1060,
    '统计周期末在职人数+统计周期内离职人数': 1118,
    '离职率(%)': 5.19
  },
  {
    key: 6,
    统计项目: '<2年',
    统计周期内离职人数: 58,
    统计周期末在职人数: 363,
    '统计周期末在职人数+统计周期内离职人数': 421,
    '离职率(%)': 13.78
  },
  {
    key: 7,
    统计项目: '2-5年',
    统计周期内离职人数: 3,
    统计周期末在职人数: 415,
    '统计周期末在职人数+统计周期内离职人数': 418,
    '离职率(%)': 0.72
  },
  {
    key: 8,
    统计项目: '≥5年',
    统计周期内离职人数: 5,
    统计周期末在职人数: 382,
    '统计周期末在职人数+统计周期内离职人数': 387,
    '离职率(%)': 1.29
  },
  {
    key: 9,
    统计项目: '护士',
    统计周期内离职人数: 61,
    统计周期末在职人数: 481,
    '统计周期末在职人数+统计周期内离职人数': 542,
    '离职率(%)': 11.25
  },
  {
    key: 10,
    统计项目: '护师及以上',
    统计周期内离职人数: 5,
    统计周期末在职人数: 679,
    '统计周期末在职人数+统计周期内离职人数': 684,
    '离职率(%)': 0.73
  },
  {
    key: 11,
    统计项目: '专科及以下',
    统计周期内离职人数: 21,
    统计周期末在职人数: 422,
    '统计周期末在职人数+统计周期内离职人数': 443,
    '离职率(%)': 4.74
  },
  {
    key: 11,
    统计项目: '本科及以上',
    统计周期内离职人数: 45,
    统计周期末在职人数: 738,
    '统计周期末在职人数+统计周期内离职人数': 783,
    '离职率(%)': 5.75
  },
  {
    key: 11,
    统计项目: '合计',
    统计周期内离职人数: 66,
    统计周期末在职人数: 1160,
    '统计周期末在职人数+统计周期内离职人数': 1226,
    '离职率(%)': 1226
  }
]

export const 护士离职率 = { dataSource, columns }
