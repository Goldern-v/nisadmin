import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import service from 'src/services/api'
import { authStore } from 'src/stores/index'
import moment from 'moment'
moment.locale('zh-cn')
const dateFormat = 'YYYY-MM-DD 00:00:00'

export default function PerformChart () {
  // const [count, setCount] = useState(0)
  useEffect(() => {
    // console.log(count, setCount)
    const postData = {
      wardCode: authStore.selectedDeptCode, // string 必须参数 科室编码
      startTime: moment().format(dateFormat), // string 必须参数 开始时间 2019-01-01 00:00:00
      endTime: moment()
        .add(1, 'd')
        .format(dateFormat) // string 必须参数 结束时间 2019-01-02 00:00:00
    }
    // console.log('===BedSituation', postData)
    // service
    service.homeApiServices.executeStatus(postData).then((res) => {
      console.log('===BedSituation', res)
    })
  }, [])
  return (
    <div>
      <Head>
        <div className='headLeft'>执行单情况</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <table>
          <thead>
            <tr>
              <th>类型</th>
              <th>总计</th>
              <th>已完成</th>
              <th>完成率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </Mid>
    </div>
  )
}

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
const Mid = styled.div`
  /* padding: 18px 18px 0 18px; */
  height: 282px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
  table {
    width: 100%;
    border: 1px solid #e5e5e5;
    text-align: center;
  }
  th {
    height: 36px;
    border: 1px solid #e5e5e5;
    color: #666666;
    background: rgba(247, 250, 250, 1);
  }
  td {
    height: 36px;
    border: 1px solid #e5e5e5;
  }
  td:nth-of-type(1) {
    width: 34%;
  }
  td:nth-of-type(2) {
    width: 22%;
  }
  td:nth-of-type(3) {
    width: 22%;
  }
  td:nth-of-type(4) {
    width: 22%;
  }
`
