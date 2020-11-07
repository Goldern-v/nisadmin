import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
const DataSet = require('@antv/data-set')
import { Chart, Tooltip, Axis, Legend, Bar, SmoothLine, Line, Point, Coord } from 'viser-react'
export interface Props {
  dataSource: any[]
  keys: string[]
  name: string
  lineKey: string
  dictionary?: any
  legendData: any[]
}
// const data = [
//   { time: '10:10', call: 4, waiting: 2, people: 2 },
//   { time: '10:15', call: 2, waiting: 6, people: 3 },
//   { time: '10:20', call: 13, waiting: 2, people: 5 },
//   { time: '10:25', call: 9, waiting: 9, people: 1 },
//   { time: '10:30', call: 5, waiting: 2, people: 3 },
//   { time: '10:35', call: 8, waiting: 2, people: 1 },
//   { time: '10:40', call: 13, waiting: 1, people: 2 }
// ]
let data3 = [
  {
    index: 1,
    wardName: '颌面外科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 2,
    wardName: '综合科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 3,
    wardName: '重症医学护理单元',
    actualOpenBeds: 25,
    actualNurseCount: 25,
    actualBedNurseRatio: '1:1',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 4,
    wardName: '重症急诊护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 5,
    wardName: '肿瘤血液护理单元',
    actualOpenBeds: 35,
    actualNurseCount: 14,
    actualBedNurseRatio: '1:0.4',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 6,
    wardName: '肿瘤科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 7,
    wardName: '中医科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 8,
    wardName: '整形外科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 9,
    wardName: '营养科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 10,
    wardName: '眼科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 11,
    wardName: '血液内科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 12,
    wardName: '血透室护理单元',
    actualOpenBeds: 89,
    actualNurseCount: 1,
    actualBedNurseRatio: '1:0.01',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 34
  },
  {
    index: 13,
    wardName: '胸外科护理单元',
    actualOpenBeds: 1,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 14,
    wardName: '胸外、甲乳科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 1,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 15,
    wardName: '心血管内科护理单元',
    actualOpenBeds: 75,
    actualNurseCount: 22,
    actualBedNurseRatio: '1:0.29',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 8
  },
  {
    index: 16,
    wardName: '心胸外科护理单元',
    actualOpenBeds: 32,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 12
  },
  {
    index: 17,
    wardName: '新生儿科护理单元',
    actualOpenBeds: 42,
    actualNurseCount: 24,
    actualBedNurseRatio: '1:0.57',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 18,
    wardName: '消化内科护理单元',
    actualOpenBeds: 49,
    actualNurseCount: 25,
    actualBedNurseRatio: '1:0.51',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 19,
    wardName: '显微手足护理单元',
    actualOpenBeds: 52,
    actualNurseCount: 16,
    actualBedNurseRatio: '1:0.3',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 4
  },
  {
    index: 20,
    wardName: '五官科护理单元',
    actualOpenBeds: 26,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 10
  },
  {
    index: 21,
    wardName: '外科一护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 22,
    wardName: '外科五护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 23,
    wardName: '外科四护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 24,
    wardName: '外科三护理单元',
    actualOpenBeds: 1,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 25,
    wardName: '外科六护理单元',
    actualOpenBeds: 1,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 26,
    wardName: '外科二护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 27,
    wardName: '手术室护理单元',
    actualOpenBeds: 12,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 28,
    wardName: '肾内科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 7,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 29,
    wardName: '神经外科护理单元',
    actualOpenBeds: 53,
    actualNurseCount: 18,
    actualBedNurseRatio: '1:0.33',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 3
  },
  {
    index: 30,
    wardName: '神经内科护理单元',
    actualOpenBeds: 70,
    actualNurseCount: 25,
    actualBedNurseRatio: '1:0.35',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 3
  },
  {
    index: 31,
    wardName: '烧伤科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 1,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 32,
    wardName: '商务体检护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 16,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 33,
    wardName: '沙溪骨二科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 34,
    wardName: '沙溪妇科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 1,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 35,
    wardName: '普外科护理单元',
    actualOpenBeds: 66,
    actualNurseCount: 22,
    actualBedNurseRatio: '1:0.33',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 4
  },
  {
    index: 36,
    wardName: '皮肤科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 1,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 37,
    wardName: '内科一护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 38,
    wardName: '内科三护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 39,
    wardName: '内科二护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 1,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 40,
    wardName: '内分泌科护理单元',
    actualOpenBeds: 50,
    actualNurseCount: 15,
    actualBedNurseRatio: '1:0.3',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 5
  },
  {
    index: 41,
    wardName: '泌尿外科护理单元',
    actualOpenBeds: 35,
    actualNurseCount: 12,
    actualBedNurseRatio: '1:0.34',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 2
  },
  {
    index: 42,
    wardName: '康复科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 43,
    wardName: '旧产科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 44,
    wardName: '介入科护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 4,
    actualBedNurseRatio: '0:1',
    targeBedNurseRatio: '0:0',
    nurseToReplenish: 0
  },
  {
    index: 45,
    wardName: '呼吸内科护理单元',
    actualOpenBeds: 62,
    actualNurseCount: 22,
    actualBedNurseRatio: '1:0.35',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 2
  },
  {
    index: 46,
    wardName: '骨科护理单元',
    actualOpenBeds: 65,
    actualNurseCount: 16,
    actualBedNurseRatio: '1:0.24',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 10
  },
  {
    index: 47,
    wardName: '感染科护理单元',
    actualOpenBeds: 42,
    actualNurseCount: 14,
    actualBedNurseRatio: '1:0.33',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 2
  },
  {
    index: 48,
    wardName: '妇科护理单元',
    actualOpenBeds: 74,
    actualNurseCount: 21,
    actualBedNurseRatio: '1:0.28',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 8
  },
  {
    index: 49,
    wardName: '妇产一区护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 50,
    wardName: '妇产四区护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 51,
    wardName: '妇产三区护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 52,
    wardName: '耳鼻咽喉护理单元',
    actualOpenBeds: 38,
    actualNurseCount: 11,
    actualBedNurseRatio: '1:0.28',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 4
  },
  {
    index: 53,
    wardName: '儿内科护理单元',
    actualOpenBeds: 73,
    actualNurseCount: 30,
    actualBedNurseRatio: '1:0.41',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 54,
    wardName: '儿科一护理单元',
    actualOpenBeds: 0,
    actualNurseCount: 0,
    actualBedNurseRatio: '0:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 55,
    wardName: '儿科二护理单元',
    actualOpenBeds: 28,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 11
  },
  {
    index: 56,
    wardName: '产科护理单元',
    actualOpenBeds: 113,
    actualNurseCount: 75,
    actualBedNurseRatio: '1:0.66',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 57,
    wardName: 'ICU护理单元',
    actualOpenBeds: 1,
    actualNurseCount: 0,
    actualBedNurseRatio: '1:0',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 0
  },
  {
    index: 58,
    wardName: '合计',
    actualOpenBeds: 1210,
    actualNurseCount: 440,
    actualBedNurseRatio: '1:0.36',
    targeBedNurseRatio: '1:0.4',
    nurseToReplenish: 44
  }
]
// const scale = [
//   {
//     dataKey: 'call',
//     min: 0
//   },
//   {
//     dataKey: 'people',
//     min: 0
//   },
//   {
//     dataKey: 'waiting',
//     min: 0
//   }
// ]
data3.pop()
export default function BaseChart(props: Props) {
  let dataSourceFilter = [...props.dataSource]
  dataSourceFilter.pop()
  // const dv = new DataSet.View().source(dataSourceFilter)
  // dv.transform({
  //   type: 'fold',
  //   fields:{dataSourceFilter.wardName},
  //   key: '月份',
  //   value: '月均降雨量'
  // })
  // const data = dv.rows

  const dv = new DataSet.View().source(data3)
  dv.transform({
    type: 'fold',
    fields: ['actualOpenBeds', 'actualNurseCount'],
    key: 'type',
    value: 'value'
  })
  const data = dv.rows

  return (
    <Con>
      {/* <div>{props!.dataSource}</div> */}
      <ChartCon>
        <Chart forceFit height={350} data={data}>
          <Coord type='rect' />
          <Tooltip />
          {/* <Legend
            // 不使用默认图例  true
            custom={true}
            allowAllCanceled
            position='top-left'
            items={props.legendData!.map((item: any) => {
              return {
                value: item.name,
                symbol: item.symbol,
                radius: 5,
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                  fill: '#404040', // 文本的颜色
                  fontSize: '32', // 文本大小
                  fontWeight: 'bold', // 文本粗细
                  rotate: 30 // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
                  // textBaseline: "top" // 文本基准线，可取 top middle bottom，默认为middle
                }
              }
            })}
            onClick={(ev, chart) => {
              const item = ev.item
              const value = item.value
              const checked = ev.checked
              const geoms = chart.getAllGeoms()
              for (let i = 0; i < geoms.length; i++) {
                const geom = geoms[i]
                if (geom.getYScale().field === value) {
                  if (checked) {
                    geom.show()
                  } else {
                    geom.hide()
                  }
                }
              }
            }}
          /> */}
          <Legend />
          <Axis
            dataKey='wardName'
            // grid={null}
            // offset={[60, 80]}
            // label={{
            //   textStyle: {
            //     fill: '#fdae6b'
            //   }
            // }}
          />
          <Axis
            dataKey='value'
            // grid={null}
            // offset={[60, 80]}
            // label={{
            //   textStyle: {
            //     fill: '#fdae6b'
            //   }
            // }}
          />
          <Bar position='wardName*value' color='red' adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
          {/* <SmoothLine position={`wordName*${props.lineKey}`} color='#fdae6b' size={3} />
          <Point shape='circle' position={`wordName*${props.lineKey}`} color='#fdae6b' size={3} /> */}
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
