import React, { useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar, Legend } from 'viser-react'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { hjExamModal } from '../../HjExamModal'
import { Content, Title, TableTitle, ChartCon } from './styleCss'
export interface Props { }

export default observer(function HierarchyExamReport() {
  const DataSet = require('@antv/data-set')

  //初始化数据
  useEffect(() => {
    hjExamModal.excelOnloadByHierarchy()
  }, [hjExamModal.excelTableListByHierarchy.length])

  const columns: any = [
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      width: 160,
      align: 'center'
    },
    {
      title: '应参与人数',
      dataIndex: 'totalPersonCount',
      width: 80,
      align: 'center'
    },
    {
      title: '已参与人数',
      dataIndex: 'finishedPersonCount',
      width: 80,
      align: 'center'
    },
    {
      title: '未参与人数',
      dataIndex: 'unFinishedPersonCount',
      width: 80,
      align: 'center'
    },
    {
      title: '参与率',
      dataIndex: 'participateRate',
      width: 80,
      align: 'center',
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: '未参与率',
      dataIndex: 'unParticipateRate',
      width: 80,
      align: 'center',
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: '科室平均正确率',
      dataIndex: 'avgCorrectRate',
      width: 100,
      align: 'center',
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: '科室平均分',
      dataIndex: 'avgScores',
      width: 80,
      align: 'center'
    }
  ]

  // 数据可视化柱状图设置
  let chartData = [
    { name: '应参与人数' },
    { name: '实际参与人数' },
    { name: '参与率' },
  ] as any[]
  let fields = []
  for (let i = 0; i < hjExamModal.excelTableListByHierarchy.length; i++) {
    let item: any = hjExamModal.excelTableListByHierarchy[i]
    fields.push(item.nurseHierarchy)
    chartData[0][item.nurseHierarchy] = item.totalPersonCount || 0
    chartData[1][item.nurseHierarchy] = item.finishedPersonCount || 0
    chartData[2][item.nurseHierarchy] = item.participateRate || 0
  }
  if (hjExamModal.excelTableListByHierarchy.length <= 0) chartData = []
  const dv = new DataSet.View().source(chartData);
  dv.transform({
    type: 'fold',
    fields,
    key: 'nurseHierarchy',
    value: 'participateRate',
  });
  const data = dv.rows;

  return (
    <Content>
      <Title>《层级参与人数柱状图》</Title>
      <ChartCon>
        <Chart
          forceFit
          data={data}
          height={500}
        >
          <Tooltip />
          <Legend />
          <Axis />
          <Bar
            color="name"
            position="nurseHierarchy*participateRate"
            adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
        </Chart>
      </ChartCon>
      <TableTitle>层级维度分析</TableTitle>
      <BaseTable
        dataSource={hjExamModal.excelTableListByHierarchy}
        columns={columns}
      />
    </Content>
  )
})

