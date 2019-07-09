import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
const DataSet = require('@antv/data-set')
import { Chart, Tooltip, Axis, Legend, Bar, SmoothLine, Line, Point, Coord } from 'viser-react'
export interface Props {
  dataSource: any[]
  keys: string[]
  name: string
  gName: string
  lineKey: string
  dictionary?: any
  legendData: any[]
}
export default function BaseChart(props: Props) {
  let sourceData: any = []
  const [hightAuto, setHightAuto] = useState(document.body.offsetHeight - 236)
  useEffect(() => {
    const onresize = () => {
      let h = document.body.offsetHeight - 236
      setHightAuto(h)
    }
    window.addEventListener('resize', onresize)

    return () => {
      window.removeEventListener('resize', onresize)
    }
  })
  // for (let i = 0; i < props.keys.length; i++) {
  //   let obj: any = {}
  //   for (let j = 0; j < props.dataSource.length; j++) {
  //     // console.log(props.dataSource[j], 'props.dataSource[j][props.name]')
  //     obj[props.dataSource[j][props.name]] = props.dataSource[j][props.keys[i]]
  //   }
  //   sourceData.push({
  //     name: props.keys[i],
  //     ...obj
  //   })
  // }
  sourceData = JSON.parse(JSON.stringify(props.dataSource))
  sourceData = sourceData.filter((item: any) => item.wardName !== '合计')
  let dataString = JSON.stringify(sourceData)
  for (let key in props.dictionary) {
    dataString = dataString.replace(new RegExp(key, 'g'), props.dictionary[key])
  }
  sourceData = JSON.parse(dataString)

  // data = data.filter((item: any) => item.key !== '合计')
  // for (let i = 0; i < getData.length; i++) {
  //   let everyObj = getData[i]
  //   for (let key in everyObj) {
  //     let newKey = props.dictionary[key]
  //     if (newKey) {
  //       everyObj[newKey] = everyObj[key]
  //       delete everyObj[key]
  //     }
  //   }
  // }
  const dv = new DataSet.View().source(sourceData)
  dv.transform({
    type: 'fold',
    fields: props.keys,
    // fields: ['实际开放床位数', '实际配备护士数'],
    key: 'type',
    value: 'value'
  })
  const data = dv.rows
  return (
    <Con>
      {/* <div>{props!.dataSource}</div> */}
      <ChartCon>
        <Chart forceFit height={hightAuto} data={data} padding={[23, 50, 50]}>
          <Coord type='rect' />
          <Tooltip />
          {/* <div style={{ padding: '10px auto' }}> */}
          <Legend position='top-left' offsetX={-10} />
          {/* </div> */}
          <Axis dataKey={props.gName} label={{ offset: 12 }} />
          <Axis dataKey='value' />

          {/* <Bar position={props.gName + '*value'} color='type' adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} /> */}
          <Bar position='护理单元*value' color='type' adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />

          {props.lineKey ? (
            <Point shape='circle' position={'护理单元*' + props.lineKey} color='#fdae6b' size={3} />
          ) : (
            ''
          )}
          {props.lineKey ? <SmoothLine position={'护理单元*' + props.lineKey} color='#fdae6b' size={3} /> : ''}
          {/* <Point shape='circle' position='护理单元*实际床护比' color='#fdae6b' size={3} />
          <SmoothLine position='护理单元*实际床护比' color='#fdae6b' size={3} /> */}
        </Chart>
      </ChartCon>
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const ChartCon = styled.div`
  /* margin: 0 auto; */
  margin-top: 80px;
  /* width: 70%; */
`
