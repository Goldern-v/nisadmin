import React, { useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar, Legend, Coord, Pie } from 'viser-react'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { hjExerciseModal } from '../../HjExerciseModal'
import { Content, Title, TableTitle, ChartCon, Part, PartOne } from './styleCss'
export interface Props { }

export default observer(function ScoresSectionExamReport() {
  const DataSet = require('@antv/data-set')

  //初始化数据
  useEffect(() => {
    hjExerciseModal.excelOnloadByScoresSection()
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl =
        document.querySelector('.hj-exam-report-scoresSection1 canvas') as HTMLCanvasElement
      if (canvasEl) hjExerciseModal.scoresSectionImgZhu = canvasEl.toDataURL()
      let canvasEl2 =
        document.querySelector('.hj-exam-report-scoresSection2 canvas') as HTMLCanvasElement
      if (canvasEl2) hjExerciseModal.scoresSectionImgYuan = canvasEl2.toDataURL()
    }, 500)
    return () => clearTimeout(timer)
  }, [hjExerciseModal.excelTableListByScoresSection.length])

  const columns: any = [
    {
      title: '分数段',
      dataIndex: 'scoresSection',
      width: 120,
      align: 'center'
    },
    {
      title: '人数',
      dataIndex: 'personCount',
      width: 80,
      align: 'center'
    },
    {
      title: '人数占比',
      dataIndex: 'personRatio',
      width: 80,
      align: 'center',
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: '该分数段平均正确率',
      dataIndex: 'avgCorrectRate',
      width: 80,
      align: 'center',
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: '该分数段平均进度',
      dataIndex: 'avgProgressRate',
      width: 80,
      align: 'center',
      render: (text: any) => {
        return <span>{text * 100}%</span>
      }
    },
    {
      title: '该分数段平均分',
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
  for (let i = 0; i < hjExerciseModal.excelTableListByScoresSection.length; i++) {
    let item: any = hjExerciseModal.excelTableListByScoresSection[i]
    fields.push(item.scoresSection)
    chartData[0][item.scoresSection] = item.personCount || 0
  }
  if (hjExerciseModal.excelTableListByScoresSection.length <= 0) chartData = []
  const dvZhu = new DataSet.View().source(chartData);
  dvZhu.transform({
    type: 'fold',
    fields,
    key: 'scoresSection',
    value: 'personCount',
  });
  const dataZhu = dvZhu.rows;


  // 数据可视化饼状图设置
  const scaleTheta = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  }];
  const dv = new DataSet.View().source(hjExerciseModal.excelTableListByScoresSection);
  dv.transform({
    type: 'percent',
    field: 'personCount',
    dimension: 'scoresSection',
    as: 'percent'
  });
  const data = dv.rows;


  return (
    <Content>
      <Title>《各分数段人数数据图》</Title>
      <ChartCon>
        <PartOne className='hj-exam-report-scoresSection1'>
          <Chart
            forceFit
            // data={hjExerciseModal.excelTableListByScoresSection}
            height={500}
            data={dataZhu}
          >
            <Tooltip />
            <Axis />
            <Bar color="name" position="scoresSection*personCount" adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
          </Chart>
        </PartOne>
        <Part className='hj-exam-report-scoresSection2'>
          <Chart forceFit height={300} data={data} scale={scaleTheta}>
            <Tooltip showTitle={false} />
            <Axis />
            <Legend dataKey="scoresSection" />
            <Coord type="theta" />
            <Pie
              position="percent"
              color="scoresSection"
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
      <TableTitle>分数段维度分析</TableTitle>
      <BaseTable
        dataSource={hjExerciseModal.excelTableListByScoresSection}
        columns={columns}
      />
    </Content>
  )
})


