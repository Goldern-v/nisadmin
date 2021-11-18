import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react';

import { trainingChartAnalysisModal } from '../trainingChartAnalysisModal'
import { Title, Content } from './styleCss'
import EChartsReact from 'echarts-for-react'

export interface Props {
  title: string,
}
const monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ]
export default observer(function AnalysisChart(props: Props) {
  const { title } = props
  
  const getOption = () => {
    const { teachingMethodList } = trainingChartAnalysisModal
    const sourceList  = teachingMethodList.map(
      (v: string, i: number) => {
        // const arr = Array.from(new Array(12), () => i)
        const arr = Array.from(new Array(12), (v, k) => parseInt((Math.random() * 20) + ''))
        return [v, ...arr]
      }
    )
    const seriesList = teachingMethodList.map(() => ({
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    }))
    let option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['月份', ...monthList],
          ...sourceList
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        ...seriesList,
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@1月} ({d}%)'
          },
          encode: {
            itemName: '月份',
            value: '1月',
            tooltip: '1月'
          }
        }
      ]
    }
    return option
  }

  let chartRef: any = React.createRef()

  useEffect(() => {
    chartRef.getEchartsInstance().setOption(getOption())
  }, [trainingChartAnalysisModal.selectedTab])
    
  const updateOption = (dimension: string) => {
    chartRef.getEchartsInstance().setOption({
      series: {
        type: 'pie',
        id: 'pie',
        label: {
          formatter: '{b}: {@[' + dimension + ']} ({d}%)'
        },
        encode: {
          itemName: '月份',
          value: dimension,
          tooltip: dimension
        }
      }
    })
  }

  const updateAxisPointer = (e: any) => {
    const xAxisInfo = e.axesInfo[0];
    if (!xAxisInfo) return
    const dimension = xAxisInfo.value + 1
    updateOption(dimension)
  }

  const onEvents = {
    'updateAxisPointer': updateAxisPointer
  }

  return (
    <Content>
      <Title>《{title}》</Title>
      <div className="echarts-body">
        <ReactEcharts
          option={getOption()}
          onEvents={onEvents}
          ref={(node: EChartsReact) => chartRef = node} />
      </div>
    </Content>
  )
})
