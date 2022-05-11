import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import EChartsReact from "echarts-for-react";

import HomeApi from 'src/modules/home/api/HomeApi'
import { authStore } from 'src/stores/index'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
moment.locale('zh-cn')
const dateFormat = 'YYYY-MM-DD 00:00:00'

export default observer(function BedSituation () {
  const [list, setList] = useState<any[]>([])
  let chartRef: any = React.createRef();
  const [totalBed, setTotalBed] = useState(0)
  

  const getOption = () => {

    let option = {
      legend: {
        orient: "vertical",
        top: "top",
        left: "left",
        formatter: (val: any) => {
          let item = list.find(v => v.name === val)
          return item ? `${val}:${totalBed <= 0 ? '0%' : (item.value / totalBed * 100).toFixed(2) + '%'}` : val
        }
      },
      tooltip: {
        trigger: "item",
        formatter: '{b}  {c}'
      },
      series: [
        {
          type: "pie",
          id: "pie",
          radius: ["40%", "60%"],
          center: ["50%", "50%"],
          emphasis: {
            focus: "self",
          },
          data: list,
          label: {
            show: true,
            rotate: true,
            position: 'inside',
            formatter: '{c}',
            fontWeight: 'bold',
          },
        },
      ],
    };
    return option;
  };

  useEffect(() => {
    const postData = {
      wardCode: authStore.selectedDeptCode, // string 必须参数 科室编码
      startTime: moment().format(dateFormat), // string 必须参数 开始时间 2019-01-01 00:00:00
      endTime: moment()
        .add(1, 'd')
        .format(dateFormat) // string 必须参数 结束时间 2019-01-02 00:00:00
    }
    if (!(authStore.selectedDeptCode && authStore.selectedDeptCode !== '8204')) return
      HomeApi.bedInfo(postData)
        .then(async (res: any) => {
  
          if (res) {
            let totalBed: any = res.data.totalBed
            let useBed: any = res.data.useBed
            setTotalBed(totalBed)
            await setList([
              { name: '已占用', value: useBed },
              { name: '空床', value: totalBed - useBed }
            ])
            chartRef.getEchartsInstance().setOption(getOption());
          }
        })
        .catch(async (err) => {
          console.log('err', err)
          // let res = {
          //   code: '200',
          //   desc: '操作成功',
          //   data: {
          //     wardCode: '030502',
          //     wardName: '神经内科护理单元',
          //     totalBed: '65',
          //     useBed: '40'
          //   }
          // }
          // let totalBed: any = res.data.totalBed
          // let useBed: any = res.data.useBed
          // await setList([
          //   { name: '已占用', value: useBed },
          //   { name: '空床', value: totalBed - useBed }
          // ])
          // chartRef.getEchartsInstance().setOption(getOption());
        })
    
  }, [authStore.selectedDeptCode])

  return (
    <div>
      <Head>
        <div className='headLeft'>床位情况</div>
        <div className='headRight'>更多&gt;</div>
      </Head>
      <ChartCon>
        <EChartsReact
          option={getOption()}
          ref={(node: EChartsReact) => (chartRef = node)}
        />
      </ChartCon>
    </div>
  )
})

const Head = styled.div`
  height: 37px;
  line-height: 37px;
  width: 100%;
  background-color: rgba(245, 246, 247, 1);
  .headLeft {
    padding-left: 17px;
    float: left;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 13px;
    letter-spacing: 1px;
    color: #999999;
  }
`
const ChartCon = styled.div`
.echarts-for-react {
  height: auto !important;
}
`