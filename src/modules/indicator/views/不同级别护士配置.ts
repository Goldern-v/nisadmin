const columns: any = [
  {
    title: '护理单元',
    dataIndex: '护理单元',
    key: '护理单元',
    width: 100,
    align: 'center'
  },
  {
    title: '护士总人数',
    dataIndex: '护士总人数',
    key: '护士总人数',
    align: 'center',
    width: 50
  },
  {
    title: '卫生技术职务',
    children: [
      {
        title: '护士人数',
        dataIndex: '护士人数',
        key: '护士人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '护士比率%',
        key: '护士比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '护师人数',
        dataIndex: '护师人数',
        key: '护师人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '护师比率%',
        key: '护师比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '主管护师人数',
        dataIndex: '主管护师人数',
        key: '主管护师人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '主管护师比率%',
        key: '主管护师比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '副主任护师人数',
        dataIndex: '副主任护师人数',
        key: '副主任护师人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '副主任护师比率%',
        key: '副主任护师比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '主任护师人数',
        dataIndex: '主任护师人数',
        key: '主任护师人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '主任护师比率%',
        key: '主任护师比率%',
        width: 15,
        align: 'center'
      }
    ]
  },
  {
    title: '学历',
    children: [
      {
        title: '中专人数',
        dataIndex: '中专人数',
        key: '中专人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '中专比率%',
        key: '中专比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '高职高专人数',
        dataIndex: '高职高专人数',
        key: '高职高专人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '高职高专比率%',
        key: '高职高专比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '大学本科人数',
        dataIndex: '大学本科人数',
        key: '大学本科人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '大学本科比率%',
        key: '大学本科比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '硕士研究生人数',
        dataIndex: '硕士研究生人数',
        key: '硕士研究生人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '硕士研究生比率%',
        key: '硕士研究生比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '博士研究生人数',
        dataIndex: '博士研究生人数',
        key: '博士研究生人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '博士研究生比率%',
        key: '博士研究生比率%',
        width: 15,
        align: 'center'
      }
    ]
  },
  {
    title: '工作年限',
    children: [
      {
        title: '<1年人数',
        dataIndex: '<1年人数',
        key: '<1年人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '<1年比率%',
        key: '<1年比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '1(含)~2年人数',
        dataIndex: '1(含)~2年人数',
        key: '1(含)~2年人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '1(含)~2年比率%',
        key: '1(含)~2年比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '2(含)~5年人数',
        dataIndex: '2(含)~5年人数',
        key: '2(含)~5年人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '2(含)~5年比率%',
        key: '2(含)~5年比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '5(含)~10年人数',
        dataIndex: '5(含)~10年人数',
        key: '5(含)~10年人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '5(含)~10年比率%',
        key: '5(含)~10年比率%',
        width: 15,
        align: 'center'
      },
      {
        title: '>10年人数',
        dataIndex: '>10年人数',
        key: '>10年人数',
        width: 15,
        align: 'center'
      },
      {
        title: '比率%',
        dataIndex: '>10年比率%',
        key: '>10年比率%',
        width: 15,
        align: 'center'
      }
    ]
  }
]

const dataSource = [
  {
    key: 1,
    护理单元: '关节护理单元',
    护士总人数: 72,
    护士人数: 72,
    '护士比率%': 72,
    护师人数: 72,
    '护师比率%': 72,
    主管护师人数: 72,
    '主管护师比率%': 72,
    副主任护师人数: 72,
    '副主任护师比率%': 72,
    主任护师人数: 72,
    '主任护师比率%': 72,
    中专人数: 72,
    '中专比率%': 72,
    高职高专人数: 72,
    '高职高专比率%': 72,
    大学本科人数: 72,
    '大学本科比率%': 72,
    硕士研究生人数: 72,
    '硕士研究生比率%': 72,
    博士研究生人数: 72,
    '博士研究生比率%': 72,
    '<1年人数': 72,
    '<1年比率%': 72,
    '1(含)~2年人数': 72,
    '1(含)~2年比率%': 72,
    '2(含)~5年人数': 72,
    '2(含)~5年比率%': 72,
    '5(含)~10年人数': 72,
    '5(含)~10年比率%': 72,
    '>10年人数': 72,
    '>10年比率%': 72
  }
]

export const 不同级别护士配置 = { dataSource, columns }
