import React from 'react';
import ReactEcharts from 'echarts-for-react';


export interface Props {
  chartHeight?: number,
  sourceData?: any[],
  isRing?: boolean,
}
export default function CircleChart(props: Props) {
  const { chartHeight, sourceData } = props
  /**
   * 饼图的配置对象
   */
  const getOption = () => {
    return {
      title: {
        text: '发热患者人数统计饼图',
        x: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'center',
        // data: ['手术三天发热患者人数', '入院三天发热患者人数', '入院三天内术后发热患者人数', '其他发热患者人数']
      },
      series: [
        {
          // name: '',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: sourceData,
          label: {
            show: true,
            formatter: '{b} : {c} ({d}%)'
          },
          labelLine: { show: true }
        }
      ]
    }
  }
  return (<ReactEcharts style={{ height: chartHeight }} option={getOption()} />)
}