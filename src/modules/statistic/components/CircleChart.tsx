import { Chart, Tooltip, Axis, Legend, Pie, Coord } from 'viser-react';
import * as React from 'react';
const DataSet = require('@antv/data-set');

export interface Props {
  chartHeight?: number,
  sourceData?: any[],
  isRing?: boolean,
}

export default function CircleChart(props: Props) {
  const { chartHeight, sourceData, isRing } = props

  const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: (val: any) => {
      let percent = (Math.round(val * 10000) / 100).toString()
      if (percent.split('.')[1] && percent.split('.')[1].length == 1)
        percent += '0'

      return `${percent}%`
    },
  }];

  const dv = new DataSet.View().source(sourceData || []);
  dv.transform({
    type: 'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
  const data = dv.rows;

  return (
    <Chart forceFit height={chartHeight} data={data} scale={scale}>
      <Legend dataKey="type" />
      <Tooltip showTitle={false} />
      {isRing && <Coord type="theta" radius={0.75} innerRadius={0.6} />}
      {!isRing && <Coord type="theta" />}
      <Axis />
      <Pie
        position="percent"
        color="type"
        style={{ stroke: '#fff', lineWidth: 1 }}
        label={['percent', {
          formatter: (val: any, item: any) => `${item.point.type} : ${val}`
        }]}
      />
    </Chart>
  )
}





