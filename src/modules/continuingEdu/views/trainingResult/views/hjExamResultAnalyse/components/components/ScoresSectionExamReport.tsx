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
  }, [hjExamModal.excelTableListByScoresSection.length])

  const columns: any = [
    {
      title: '分数段',
      dataIndex: 'scoresSection',
      width: 120,
      align: 'left'
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
        <PartOne>
          <Chart
            forceFit
            data={hjExamModal.excelTableListByScoresSection}
            height={500}
            scale={scale}
          >
            <Tooltip />
            <Axis />
            <Bar position="scoresSection*personCount" />
          </Chart>
        </PartOne>
        <Part>
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


