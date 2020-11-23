import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Chart, Tooltip, Axis, Guide, Line, Point} from 'viser-react'
import {Select} from "src/vendors/antd";

const DataSet = require('@antv/data-set')

const labelMap: any = {
  firstPercent: '第一季度',
  secondPercent: '第二季度',
  thirdPercent: '第三季度',
  fourthPercent: '第四季度',
  firstNumerator: '第一季度',
  secondNumerator: '第二季度',
  thirdNumerator: '第三季度',
  fourthNumerator: '第四季度',
}
// 转换成数字
const trans2Num = (data: string) => {
  if (!data) return 0
  if (data.includes('%')) {
    return Number(data.split('%')[0])
  } else {
    return Number(data)
  }
}
// 构造canvas需要的数据
const initCanvasData = (currentData: any) => {
  const dv = new DataSet.View().source([currentData])
  // 配置展示的数据字段
  const fields = currentData.valveType === 'numerator' ?
    ['firstNumerator', 'secondNumerator', 'thirdNumerator', 'fourthNumerator'] :
    ['firstPercent', 'secondPercent', 'thirdPercent', 'fourthPercent']
  dv.transform({
    type: 'fold',
    fields: fields,
    key: 'type',
    value: 'value',
    retains: ['indicatorName', 'valve']
  })
  dv.transform({
    type: 'map',
    callback(row: any) {
      row.baseline = trans2Num(row.valve)
      row.value = trans2Num(row.value)
      row.label = labelMap[row.type]
      return row;
    }
  })
  return dv.rows
}

export default function ChartComponent(props: { dataSource: any[] }) {
  const [chartHeight, setChartHeight] = useState(450)
  const [currentData, setCurrentData] = useState(props.dataSource[0])
  const [canvasData, setCanvasData] = useState([])

  useEffect(() => {
    // 设置canvas初始高度
    const dom = document.getElementById('chartWrapper') || {offsetHeight: 450}
    setChartHeight(dom.offsetHeight - 32)  // 32：搜索框的高度
  }, [])

  useEffect(() => {
    // 初始化数据
    setCurrentData(props.dataSource[0])
    setCanvasData(initCanvasData(currentData))
  }, [props.dataSource])

  // 坐标系显示字段过滤
  const axisLabel: any = {
    formatter: (value: string) => {
      return currentData.valveType === 'numerator' ? value : value + '%'
    }
  }

  // 选中事件
  const handleSelectChange = (code: string) => {
    const current = props.dataSource.find(v => v.indicatorCode === code) || {indicatorName: ''}
    setCurrentData(current)
    setCanvasData(initCanvasData(current))
  }

  return (
    <Wrapper valveType={currentData.valveType} id='chartWrapper'>
      {/* 下拉选择组件 */}
      <Select
        showSearch
        style={{width: 200}}
        value={currentData.indicatorName}
        onChange={handleSelectChange}
        filterOption={(input: string, option: any) => option.props.children.includes(input)}
      >
        {props.dataSource.map((item: any) => (
          <Select.Option value={item.indicatorCode} key={item.indicatorCode}>
            {item.indicatorName}
          </Select.Option>
        ))}
      </Select>
      <span> {currentData.valveType}</span>

      {/* 图表组件 */}
      <Chart forceFit height={chartHeight} data={canvasData} padding={[30, 50, 30, 50]}>
        {/* 提示信息组件 鼠标悬停在图表上的某点时展示该点的数据 */}
        <Tooltip/>
        {/* 坐标值配置 */}
        <Axis dataKey="value" label={axisLabel}/>

        {/* 基线 */}
        <Guide
          type="line"
          start={['min', trans2Num(currentData.valve)]}
          end={['max', trans2Num(currentData.valve)]}
          lineStyle={{
            stroke: '#595959',
            lineWidth: 1,
            lineDash: [3, 3]
          }}
          text={{
            position: 'start',
            style: {
              fill: '#8c8c8c',
              fontSize: 15,
              fontWeight: 'normal'
            },
            content: `基线 ${currentData.valve}`,
            offsetY: -5
          }}
        />

        {/* 线 */}
        <Line position="label*value" color="indicatorName"/>

        {/* 点 */}
        <Point position="label*value" color="indicatorName" shape="circle"/>
      </Chart>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    
    // props.valveType ！== 'numerator' 的时候 在 Tooltip 数据后面加 ’%‘
    // eg：实在找不到在哪里控制这个 Tooltip 
    .g2-tooltip-value{
      &:after{
        content: ${(props: { valveType?: string }) => props.valveType === 'numerator' ? '' : '"%"'};
      }
    }
  }
  `