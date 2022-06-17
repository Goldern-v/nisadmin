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
      data: ['手术三天发热患者人数', '入院三天发热患者人数', '入院三天内术后发热患者人数', '其他发热患者人数', '未发热患者人数'],
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
        name: '手术三天发热患者人数',
        type: 'line',
        data: sourceData.shoushu || [],
        label: { show: true }
      },
      {
        name: '入院三天发热患者人数',
        type: 'line',
        data: sourceData.ruyuan || [],
        label: { show: true } 
      },
      {
        name: '入院三天内术后发热患者人数',
        type: 'line',
        data: sourceData.ruyuanshoushu || [],
        label: { show: true }
      },
      {
        name: '其他发热患者人数',
        type: 'line',
        data: sourceData.qita || [],
        label: { show: true }
      },
      {
        name: '未发热患者人数',
        type: 'line',
        data: sourceData.nofever || [],
        label: { show: true }
      },
    ]
  };

  return <ReactECharts style={{ height: chartHeight }} option={options} />;
};