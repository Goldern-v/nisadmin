import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
// import { TypeCompare, Report } from '../../types'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
// import { safetyCheckEditModel } from './../../model/SafetyCheckEditModel'

export interface Props {
  safetyCheckRecordList: any[],
  safetyCheckList: any[]
}

export default observer(function Table(props: Props) {
  let { safetyCheckRecordList, safetyCheckList } = props
  // let report: Report = safetyCheckEditModel.getDataInAllData('report') || {}

  // console.log('safetyCheckList', safetyCheckList)

  const recordList = (key: string) => {
    let list = safetyCheckRecordList

    let arr: any[] = []

    for (let i = 0; i < list.length; i++) {
      let current = list[i]
      let target = arr.find((item: any) => item[key] == current[key])
      if (target) {
        target.list.push(current)
      } else {
        arr.push({ list: [current], [key]: current[key] })
      }
    }

    return arr
  }

  console.log(recordList('assistWardCode'))

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='100' />
          <col width='100' />
          <col />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>需协助科室</td>
            <td>问题种类</td>
            <td colSpan={2}>内容</td>
          </tr>
          {safetyCheckRecordList.length > 0 &&
            recordList('assistWardCode').map((item: any, idx: any) =>
              <React.Fragment key={idx}>
                {item.list.map((item1: any, idx1: number) => <React.Fragment key={`${idx} ${idx1}`}>
                  <tr>
                    {idx1 == 0 && <td rowSpan={item.list.length * 3}>{item.assistWardCode}</td>}
                    <td rowSpan={3}>{item1.problemType}</td>
                    <td>问题详情</td>
                    <td>{item1.content}</td>
                  </tr>
                  <tr>
                    <td>原因分析</td>
                    <td>{item1.cause}</td>
                  </tr>
                  <tr>
                    <td>整改措施</td>
                    <td>{item1.measure}</td>
                  </tr>
                </React.Fragment>)}
              </React.Fragment>)}
          {safetyCheckRecordList.length <= 0 && <tr><td colSpan={4}>无</td></tr>}
          {safetyCheckList.map((item: any, idx: number) =>
            <React.Fragment key={idx}>
              {item.list.length > 0 && item.list.map((item1: any, idx1: number) =>
                <tr key={`${idx}-${idx1}`}>
                  {idx1 === 0 && <td rowSpan={item.list.length} colSpan={2}>{item.name}</td>}
                  {/* <td>{item1.wardName}</td> */}
                  <td colSpan={2}>{item1.content}</td>
                </tr>)}
              {item.list.length <= 0 && <tr>
                <td colSpan={2}>{item.name}</td>
                <td colSpan={2}>无</td>
              </tr>}
            </React.Fragment>)}
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  margin: 5px 50px;
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
      &.align-left{
        text-align: left;
      }
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
`
