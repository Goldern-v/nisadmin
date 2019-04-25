const columns: any = [
  {
    title: '序号',
    dataIndex: '1',
    key: '序号',
    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '工号',
    dataIndex: '工号',
    key: '工号',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: '姓名',
    key: '姓名',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: '性别',
    key: '性别',
    align: 'center'
  },
  {
    title: '年龄',
    dataIndex: '年龄',
    key: '年龄',
    align: 'center'
  },
  {
    title: '基本奖金',
    dataIndex: '基本奖金',
    key: '基本奖金',
    align: 'center',
    children: [
      {
        title: '职务（30%）',
        dataIndex: '职务（30%）',
        key: '职务（30%）',
        align: 'center',
        children: [
          {
            title: '职务',
            dataIndex: '职务zw',
            key: '职务zw',
            align: 'center'
          },
          {
            title: '系数',
            dataIndex: '系数zw',
            key: '系数zw',
            align: 'center'
          },
          {
            title: '金额',
            dataIndex: '金额zw',
            key: '金额zw',
            align: 'center'
          }
        ]
      },
      {
        title: '职称（30%）',
        dataIndex: '职称（30%）',
        key: '职称（30%）',
        align: 'center',
        children: [
          {
            title: '职务',
            dataIndex: '职务zc',
            key: '职务zc',
            align: 'center'
          },
          {
            title: '系数',
            dataIndex: '系数zc',
            key: '系数zc',
            align: 'center'
          },
          {
            title: '金额',
            dataIndex: '金额zc',
            key: '金额zc',
            align: 'center'
          }
        ]
      },
      {
        title: '学历（30%）',
        dataIndex: '学历（30%）',
        key: '学历（30%）',
        align: 'center',
        children: [
          {
            title: '学历',
            dataIndex: '学历xl',
            key: '学历xl',
            align: 'center'
          },
          {
            title: '系数',
            dataIndex: '系数xl',
            key: '系数xl',
            align: 'center'
          },
          {
            title: '金额',
            dataIndex: '金额xl',
            key: '金额xl',
            align: 'center'
          }
        ]
      },
      {
        title: '工龄（10%）',
        dataIndex: '工龄（10%）',
        key: '工龄（10%）',
        align: 'center',
        children: [
          {
            title: '工龄',
            dataIndex: '工龄gl',
            key: '工龄gl',
            align: 'center'
          },
          {
            title: '系数',
            dataIndex: '系数gl',
            key: '系数gl',
            align: 'center'
          },
          {
            title: '金额',
            dataIndex: '金额gl',
            key: '金额gl',
            align: 'center'
          }
        ]
      },
      {
        title: '小计',
        dataIndex: '小计',
        key: '小计',
        align: 'center'
      }
    ]
  }
]

const dataSource = [
  {
    key: 1,
    工号: '3223',
    姓名: '江娜',
    性别: '女',
    年龄: '44',
    职务zw: '护士长',
    系数zw: '1.5',
    金额zw: '894.23',
    职务zc: '副主任护师',
    系数zc: '1.4',
    金额zc: '753.42',
    学历xl: '硕士',
    系数xl: '1.2',
    金额xl: '234.33',
    工龄gl: '8',
    系数gl: '1.8',
    金额gl: '280.00',
    小计: '1983.92'
  },
  {
    key: 2,
    工号: '3224',
    姓名: '贺芳',
    性别: '女',
    年龄: '23',
    职务zw: '-',
    系数zw: '0',
    金额zw: '0',
    职务zc: '护师',
    系数zc: '1.2',
    金额zc: '563.55',
    学历xl: '本科',
    系数xl: '1.1',
    金额xl: '204.33',
    工龄gl: '1',
    系数gl: '1',
    金额gl: '100.03',
    小计: '654.55'
  },
  {
    key: 3,
    工号: '3225',
    姓名: '侯桂英',
    性别: '女',
    年龄: '42',
    职务zw: '副护士长',
    系数zw: '1.4',
    金额zw: '753.42',
    职务zc: '主管护师',
    系数zc: '1.3',
    金额zc: '622.34',
    学历xl: '本科',
    系数xl: '1.1',
    金额xl: '204.33',
    工龄gl: '9',
    系数gl: '1.9',
    金额gl: '300.77',
    小计: '1234.88'
  },
  {
    key: 4,
    工号: '3237',
    姓名: '冯静',
    性别: '女',
    年龄: '22',
    职务zw: '-',
    系数zw: '0',
    金额zw: '0',
    职务zc: '护师',
    系数zc: '1.4',
    金额zc: '753.42',
    学历xl: '本科',
    系数xl: '1.2',
    金额xl: '234.33',
    工龄gl: '8',
    系数gl: '1.8',
    金额gl: '280.00',
    小计: '934.24'
  },
  {
    key: 5,
    工号: '4543',
    姓名: '周艳',
    性别: '女',
    年龄: '36',
    职务zw: '小组组长',
    系数zw: '0.8',
    金额zw: '212.03',
    职务zc: '护师',
    系数zc: '1.2',
    金额zc: '563.55',
    学历xl: '本科',
    系数xl: '1.1',
    金额xl: '204.33',
    工龄gl: '8',
    系数gl: '1.8',
    金额gl: '280.00',
    小计: '1258.88'
  }
]

export const 绩效表 = { dataSource, columns }
