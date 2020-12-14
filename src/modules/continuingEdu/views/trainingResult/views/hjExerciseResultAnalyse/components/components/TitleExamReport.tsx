import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { hjExerciseModal } from '../../HjExerciseModal'
import { Chart, Tooltip, Axis, Bar, Legend, Coord, Pie } from 'viser-react'
import { Content, Title, TableTitle, ChartCon, Part, PartOne } from './styleCss'
export interface Props { }

export default observer(function TitleExamReport() {
  const DataSet = require('@antv/data-set')

  //初始化数据
  useEffect(() => {
    hjExerciseModal.excelOnloadByTitle()
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl =
        document.querySelector('.hj-exam-report-title1 canvas') as HTMLCanvasElement
      if (canvasEl) hjExerciseModal.titleImgZhu = canvasEl.toDataURL()
      let canvasEl2 =
        document.querySelector('.hj-exam-report-title2 canvas') as HTMLCanvasElement
      if (canvasEl2) hjExerciseModal.titleImgYuan = canvasEl2.toDataURL()

    }, 500)
    return () => clearTimeout(timer)
  }, [hjExerciseModal.excelTableListByTitle.length])

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
      title: '职称平均进度',
      dataIndex: 'avgProgressRate',
      width: 80,
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
    { name: '参与人数' }
  ] as any[]
  let fields = []
  for (let i = 0; i < hjExerciseModal.excelTableListByTitle.length; i++) {
    let item: any = hjExerciseModal.excelTableListByTitle[i]
    fields.push(item.empTitle)
    chartData[0][item.empTitle] = item.personCount || 0
  }
  if (hjExerciseModal.excelTableListByTitle.length <= 0) chartData = []
  const dvZhu = new DataSet.View().source(chartData);
  dvZhu.transform({
    type: 'fold',
    fields,
    key: 'empTitle',
    value: 'personCount',
  });
  const dataZhu = dvZhu.rows;


  // 数据可视化饼状图设置
  const scaleTheta = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  }];
  const dv = new DataSet.View().source(hjExerciseModal.excelTableListByTitle);
  dv.transform({
    type: 'percent',
    field: 'personCount',
    dimension: 'empTitle',
    as: 'percent'
  });
  const data = dv.rows;

  return (
    <Content>
      <Title>《各职称参与人数柱状图》</Title>
      <ChartCon>
        <PartOne className='hj-exam-report-title1'>
          <Chart
            forceFit
            data={dataZhu}
            height={500}
          >
            <Tooltip />
            <Legend />
            <Axis />
            <Bar
              color="name"
              position="empTitle*personCount"
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
          </Chart>
        </PartOne>
        <Part className='hj-exam-report-title2'>
          <Chart forceFit height={300} data={data} scale={scaleTheta}>
            <Tooltip showTitle={false} />
            <Axis />
            <Legend dataKey="empTitle" />
            <Coord type="theta" />
            <Pie
              position="percent"
              color="empTitle"
              style={{ stroke: '#fff', lineWidth: 1 }}
              label={['percent', {
                offset: -40,
                textStyle: {
                  rotate: 0,
                  textAlign: 'center',
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, .45)'
                }
              }]}
            />
          </Chart>
        </Part>
      </ChartCon>
      <TableTitle>职称维度分析</TableTitle>
      <BaseTable
        dataSource={hjExerciseModal.excelTableListByTitle}
        columns={columns}
      />
    </Content>
  )
})

