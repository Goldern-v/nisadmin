import React, { useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar, Legend } from 'viser-react'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { hjExamModal } from '../../HjExamModal'
import { Content, Title, TableTitle, ChartCon } from './styleCss'
export interface Props { }

export default observer(function TitleExamReport() {
  const DataSet = require('@antv/data-set')

  //初始化数据
  useEffect(() => {
    hjExamModal.excelOnloadByTitle()
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl =
        document.querySelector('.hj-exam-report-title canvas') as HTMLCanvasElement
      if (canvasEl) hjExamModal.titleImg = canvasEl.toDataURL()
    }, 500)
    return () => clearTimeout(timer)
  }, [hjExamModal.excelTableListByTitle.length])

  const columns: any = [
    {
      title: '职称',
      dataIndex: 'empTitle',
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
      title: '职称平均正确率',
      dataIndex: 'avgCorrectRate',
      width: 100,
      align: 'center',
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: '职称平均分',
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
  for (let i = 0; i < hjExamModal.excelTableListByTitle.length; i++) {
    let item: any = hjExamModal.excelTableListByTitle[i]
    fields.push(item.empTitle)
    chartData[0][item.empTitle] = item.totalPersonCount || 0
    chartData[1][item.empTitle] = item.finishedPersonCount || 0
    chartData[2][item.empTitle] = item.participateRate || 0
  }
  if (hjExamModal.excelTableListByTitle.length <= 0) chartData = []
  const dv = new DataSet.View().source(chartData);
  dv.transform({
    type: 'fold',
    fields,
    key: 'empTitle',
    value: 'participateRate',
  });
  const data = dv.rows;

  return (
    <Content>
      <Title>《各职称参与人数柱状图》</Title>
      <ChartCon className='hj-exam-report-title'>
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
            position="empTitle*participateRate"
            adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
        </Chart>
      </ChartCon>
      <TableTitle>职称维度分析</TableTitle>
      <BaseTable
        dataSource={hjExamModal.excelTableListByTitle}
        columns={columns}
      />
    </Content>
  )
})

