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
   
      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'fold',
        fields:fields,
       
        key: '月份',
        value: '百分比',
      });
      const dataTrue = dv.rows;
    return (
   
    <Chart forceFit height={400} data={dataTrue}>
        <Tooltip />
        <Axis />
        <Legend />
        
        {/* size={30}, // 设置柱子宽度 */}
        <Bar position="月份*百分比" color="name" size={30} adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
      </Chart>
    );
}

