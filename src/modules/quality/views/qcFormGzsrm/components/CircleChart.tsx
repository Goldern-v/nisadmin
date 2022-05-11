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
    formatter: '.0%',
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
      <Tooltip showTitle={false} />
      {isRing && <Coord type="theta" radius={0.75} innerRadius={0.6} />}
      {!isRing && <Coord type="theta" />}
      <Axis />
      {/* <Legend dataKey="type" /> */}
      <Pie
        position="percent"
        color="type"
        style={{ stroke: '#fff', lineWidth: 1 }}
        label={['percent', {
          formatter: (val: any, item: any) => {
            return `${item.point.type} : ${val}`;
          }
        }]}
      />
    </Chart>
  )
}





