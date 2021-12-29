import { Chart, Tooltip, Axis, Legend, Line, Point, Guide } from 'viser-react';
import * as React from 'react';
const DataSet = require('@antv/data-set');

export interface Props {
  chartHeight?: number,
  sourceData?: any[],
  isRing?: boolean,
}
interface Data {
  year: string;
  Tokyo: number;
  London: number;
}
interface Scale {
  dataKey: string;
  min?: number;
  max?: number;
  formatter?: (val: any) => string;
}
export default function LineChart(props: Props) {
  // const { chartHeight, sourceData, isRing } = props
  const sourceData: Data[] = [
    { year: '2018', Tokyo: 7.0, London: 3.9 },
    { year: '2019', Tokyo: 6.9, London: 4.2 },
    { year: '2020', Tokyo: 9.5, London: 5.7 },
    { year: '2021', Tokyo: 14.5, London: 8.5 },
  ];
  
  const dv = new DataSet.View().source(sourceData);
  dv.transform({
    type: 'fold',
    fields: ['Tokyo', 'London'],
    key: 'city',
    value: 'temperature',
  });
  const data = dv.rows;
  
  const scale: Scale[] = [{
    dataKey: 'year',
    min: 0,
    max: 1,
  }];

  return (
    <Chart forceFit height={400} data={data} scale={scale}>
      <Tooltip/>
      <Axis/>
      <Legend/>
      <Line position="year*temperature" color="city" />
      <Point 
        position="year*temperature" 
        color="city" size={4} 
        style={{ stroke: '#fff', lineWidth: 1 }} 
        shape="circle"
      />
    </Chart>
  )
}


