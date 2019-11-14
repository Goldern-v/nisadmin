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

  // const recordList = () => {
  //   let list = safetyCheckRecordList

  //   let arr: any[] = []

  //   for (let i = 0; i < list.length; i++) {
  //     let current = list[i]
  //     let target = arr.find((item: any) => item.problemType == current.problemType)
  //     if (target) {
  //       target.list.push(current)
  //     } else {
  //       arr.push({ list: [current], problemType: current.problemType })
  //     }
  //   }

  //   return arr
  // }

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
            <td>问题种类</td>
            {/* <td>科室</td>
            <td>问题详情</td>
            <td>原因分析</td>
            <td>整改措施</td>
            <td>需协助科室</td> */}
            <td colSpan={2}>内容</td>
          </tr>
          {/* {recordList().map((item, index) =>
            <React.Fragment key={index}>
              {item.list.map((item1: any, index1: any) =>
                <tr key={`${index}-${index1}`}>
                  {index1 === 0 && <td rowSpan={item.list.length}>{item1.problemType}</td>}
                  <td>{item1.wardName}</td>
                  <td>{item1.content}</td>
                  <td>{item1.cause}</td>
                  <td>{item1.measure}</td>
                  <td>{item1.assistWardCode}</td>
                </tr>)}
            </React.Fragment>
          )} */}
          {safetyCheckRecordList.length > 0 && safetyCheckRecordList.map((item: any, idx: any) =>
            <React.Fragment key={idx}>
              <tr>
                <td rowSpan={4}>{item.problemType}</td>
                <td>问题详情</td>
                <td>{item.content}</td>
              </tr>
              <tr>
                <td>原因分析</td>
                <td>{item.cause}</td>
              </tr>
              <tr>
                <td>整改措施</td>
                <td>{item.measure}</td>
              </tr>
              <tr>
                <td>整改措施</td>
                <td>{item.assistWardCode}</td>
              </tr>
            </React.Fragment>)}
          {safetyCheckRecordList.length <= 0 && <tr><td rowSpan={3}>无</td></tr>}
          {safetyCheckList.map((item: any, idx: number) =>
            <React.Fragment key={idx}>
              {item.list.length > 0 && item.list.map((item1: any, idx1: number) =>
                <tr key={`${idx}-${idx1}`}>
                  {idx1 === 0 && <td rowSpan={item.list.length} >{item.name}</td>}
                  {/* <td>{item1.wardName}</td> */}
                  <td colSpan={2}>{item1.content}</td>
                </tr>)}
              {item.list.length <= 0 && <tr>
                <td>{item.name}</td>
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
