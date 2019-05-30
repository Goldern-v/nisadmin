import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Chart, Tooltip, Axis, Bar } from 'viser-react'
import { authStore } from 'src/stores/index'
import HomeViewModel from 'src/modules/home/HomeViewModel.ts'
import { observer } from 'mobx-react-lite'
import { any } from 'prop-types'
import emitter from 'src/libs/ev'

export interface Props {
  userTotal: number
}
export default observer(function BedSituation (props: Props) {
  const [byIndexInfo, setByIndexInfo]: any = useState({
    // 副护士长: 0,
    // 护士长: 0,
    // 护理组长: 0,
    // 护理部主任: 0,
    // 护理部副主任: 0,
    // 教学小组组长: 0,
    // 教学秘书: 0,
    // 科护士长: 0
  })
  const [jobArr, setjobArr] = useState([])
  const [tableData, setTableDate]: any = useState([])
  const scale = [
    {
      dataKey: 'sales',
      tickInterval: 20
    }
  ]

  // console.log('tranceData1111111111111111111', tranceData)
  let data = HomeViewModel.jobArr.map((item: string) => {
    // if (item !== 'userTotal') {
    //   console.log('HomeViewModel.jobArrHomeViewModel.j', HomeViewModel.jobArr)
    //   let cachedata = 30
    //   if (props.userTotal !== 0) {
    //     cachedata = parseInt((parseInt(item, 10) / props.userTotal).toFixed(4), 10) * 100
    //   }
    //   return {
    //     item: cachedata
    //   }
    // }
  })
  useEffect(() => {
    // if (HomeViewModel.NurseSituationData.userTotal) {
    //   // setByIndexInfo(HomeViewModel.NurseSituationData)
    // }
    // console.log('fffffff', HomeViewModel.NurseSituationData)
    emitter.removeAllListeners('护理人员情况全数据')
    emitter.addListener('护理人员情况全数据', (getData: any) => {
      setByIndexInfo(getData)
      // let getArrData = jobArr.map((item: any) => {
      //   return {
      //     [item]: getData[item]
      //   }
      // })
      // console.log('getArrData1111111111111111111111', getArrData)
    })
    emitter.removeAllListeners('护理人员情况数组')
    emitter.addListener('护理人员情况数组', (getArr: any) => {
      for (let i = 0; i < getArr.length; i++) {
        if (getArr[i] === 'userTotal') {
          let cacheN = i
          getArr.splice(cacheN, 1)
        }
      }
      console.log('getArr666666666666666666666', getArr)
      setjobArr(getArr)
      // let data = getArr.map((item: any) => {
      //   // if (item !== 'userTotal') {
      //   //   // console.log('HomeViewModel.jobArrHomeViewModel.j', HomeViewModel.jobArr)
      //   //   let cachedata = 30
      //   //   if (props.userTotal !== 0) {
      //   //     cachedata = parseInt((parseInt(byIndexInfo[item], 10) / props.userTotal).toFixed(4), 10) * 100
      //   //   }
      //   //   return {
      //   //     item: cachedata
      //   //   }
      //   // }
      // })
    })
  }, [authStore.selectedDeptCode])
  const tranceData = jobArr.map((item: any) => {
    // byIndexInfo: any
    // if (item !== 'userTotal') {
    // if (item === 'userTotal') {
    //   return
    // }
    return { year: item, sales: byIndexInfo[item] }
    // }
  })
  console.log('tranceData11111111111111111111', tranceData)
  // setTableDate(tranceData)
  return (
    <div>
      <ChartCon>
        {/* {data} */}
        <Chart forceFit height={300} data={tranceData} scale={scale}>
          <Tooltip />
          <Axis />
          <Bar position='year*sales' />
        </Chart>
      </ChartCon>
    </div>
  )
})

const ChartCon = styled.div`
  canvas {
    width: 100% !important;
    margin: -15px 0 0 -46px;
    /* width: 400px !important; */
  }
`
