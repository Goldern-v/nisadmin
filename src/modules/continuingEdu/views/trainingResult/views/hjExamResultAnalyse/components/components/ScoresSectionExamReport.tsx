import React, { useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar, Legend, Coord, Pie } from 'viser-react'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { hjExamModal } from '../../HjExamModal'
import { Content, Title, TableTitle, ChartCon, Part, PartOne } from './styleCss'
export interface Props { }

export default observer(function ScoresSectionExamReport() {
  const DataSet = require('@antv/data-set')

  //初始化数据
  useEffect(() => {
    hjExamModal.excelOnloadByScoresSection()
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl =
        document.querySelector('.hj-exam-report-scoresSection1 canvas') as HTMLCanvasElement
      if (canvasEl) hjExamModal.scoresSectionImgYuan = canvasEl.toDataURL()
      let canvasEl2 =
        document.querySelector('.hj-exam-report-scoresSection2 canvas') as HTMLCanvasElement
      if (canvasEl2) hjExamModal.scoresSectionImgZhu = canvasEl2.toDataURL()
    }, 500)
    return () => clearTimeout(timer)
  }, [hjExamModal.excelTableListByScoresSection.length])

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
        return <span>{(text * 100).toFixed(2)}%</span>
      }
    },
    {
      title: '该分数段平均正确率',
      dataIndex: 'avgCorrectRate',
      width: 80,
      align: 'center',
      render: (text: any) => {
        return <span>{(text * 100).toFixed(2)}%</span>
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
  const scale = [{
    dataKey: 'personCount',
    tickInterval: 20,
  }];

  // 数据可视化饼状图设置
  const scaleTheta = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  }];
  const dv = new DataSet.View().source(hjExamModal.excelTableListByScoresSection);
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
            data={hjExamModal.excelTableListByScoresSection}
            height={400}
            scale={scale}
          >
            <Tooltip />
            <Axis />
            <Bar position="scoresSection*personCount" />
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
        dataSource={hjExamModal.excelTableListByScoresSection}
        columns={columns}
      />
    </Content>
  )
})


