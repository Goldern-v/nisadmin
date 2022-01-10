import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function LineChart(props: any) {
  const { chartHeight, sourceData } = props
  const options = {
    title: {
      text: '发热患者人数统计折线图'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['手术三天', '入院三天', '入院三天内术后', '其他'],
      x: 'center',
      y: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '6%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      // boundaryGap: false,
      data: sourceData.xAxis || []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '手术三天',
        type: 'line',
        data: sourceData.shoushu || [],
        itemStyle : { normal: {label : {show: true}}}
      },
      {
        name: '入院三天',
        type: 'line',
        data: sourceData.ruyuan || [],
        itemStyle : { normal: {label : {show: true}}}
      },
      {
        name: '入院三天内术后',
        type: 'line',
        data: sourceData.ruyuanshoushu || [],
        itemStyle : { normal: {label : {show: true}}}
      },
      {
        name: '其他',
        type: 'line',
        data: sourceData.qita || [],
        itemStyle : { normal: {label : {show: true}}}
      },
    ]
  };

  return <ReactECharts style={{height: chartHeight}} option={options} />;
};