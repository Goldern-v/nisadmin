import { Chart, Tooltip, Axis, Bar } from 'viser-react';
import * as React from 'react';
interface Props{
    data?:any
}
function JmFyChart(props:Props){
    const {data} =props
    return (
        <div >
            <Chart forceFit   height={400} data={data} >
                <Tooltip />
                <Axis />
                <Bar position="wardName*score" />
            </Chart>
        </div>

        );
}
export default JmFyChart
