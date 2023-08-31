import { Chart, Tooltip, Axis, Legend, Bar } from 'viser-react';
import * as React from 'react';
const DataSet = require('@antv/data-set');

// const data = [
//     { year: '1951 年', sales: 38 },
//     { year: '1952 年', sales: 52 },
//     { year: '1956 年', sales: 61 },
//     { year: '1957 年', sales: 145 },
//     { year: '1958 年', sales: 48 },
//     { year: '1959 年', sales: 38 },
//     { year: '1960 年', sales: 38 },
//     { year: '1962 年', sales: 38 },
//   ];
  
//   const scale = [{
//     dataKey: 'sales',
//     tickInterval: 20,
//   }];


  interface Props {
	data:any,
    fields:any,
	
}
export default function ChartCylindricalityMonth(props: Props){
    const {data,fields} = props
    const sourceData = data
    // [
    //     { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
    //     { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 },
    //   ];
      
      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'fold',
        fields:fields,
        // fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
        key: '月份',
        value: '百分比',
      });
      const dataTrue = dv.rows;
    return (
    //     <Chart forceFit height={400} data={data} scale={scale}>
    //     <Tooltip />
    //     <Axis />
    //     <Bar position="year*sales" />
    //   </Chart>

    <Chart forceFit height={400} data={dataTrue}>
        <Tooltip />
        <Axis />
        <Legend />
        <Bar position="月份*百分比" color="name" adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
      </Chart>
    );
}

