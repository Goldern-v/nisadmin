import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
// import { TypeCompare, Report } from '../../types'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
// import { starRatingReportEditModel } from './../../model/StarRatingReportEditModel'

export interface Props {
  list: any[]
  totalSorce: number,
  report: any
}

export default observer(function Table(props: Props) {
  let { list, totalSorce, report } = props
  // let report: Report = starRatingReportEditModel.getDataInAllData('report') || {}

  const colList = [
    {
      title: '一月',
      key: 'januaryScore'
    },
    {
      title: '二月',
      key: 'februaryScore'
    },
    {
      title: '三月',
      key: 'marchScore'
    },
    {
      title: '四月',
      key: 'aprilScore'
    },
    {
      title: '五月',
      key: 'mayScore'
    },
    {
      title: '六月',
      key: 'juneScore'
    },
    {
      title: '七月',
      key: 'julyScore'
    },
    {
      title: '八月',
      key: 'augustScore'
    },
    {
      title: '九月',
      key: 'septemberScore'
    },
    {
      title: '十月',
      key: 'octoberScore'
    },
    {
      title: '十一',
      key: 'novemberScore'
    },
    {
      title: '十二',
      key: 'decemberScore'
    },
    {
      title: '年度加分',
      key: 'annualAddPoints'
    },
    {
      title: '总分',
      key: 'totalScore'
    },
  ]

  const formatNum = (num: number | string) => {
    num = Number(num)

    if (isNaN(num)) return '0.0'

    let numArr = num.toString().split('.')
    if (!numArr[0]) numArr[0] = '0'

    if (numArr[1]) {
      numArr[1] = numArr[1][0]
    } else {
      numArr[1] = '0'
    }

    return numArr.join('.')
  }

  // const sum = (item: any) => {
  //   let total = 100;
  //   let nursingDeduct = Number(
  //     formatNum(
  //       -Number(item.nursingDeduct)
  //     )
  //   )
  //   if (isNaN(nursingDeduct)) nursingDeduct = 0

  //   let workloadDeduct = Number(
  //     formatNum(
  //       -Number(item.workloadDeduct)
  //     )
  //   )
  //   if (isNaN(workloadDeduct)) workloadDeduct = 0

  //   let satisfactionDeduct = Number(
  //     formatNum(
  //       -Number(item.satisfactionDeduct)
  //     )
  //   )
  //   if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0

  //   return formatNum(total - nursingDeduct - workloadDeduct - satisfactionDeduct)
  // }

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='80' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>姓名</td>
            {colList.map((col: any, colIndex: number) => <td
              key={colIndex}
              style={{ textAlign: 'center' }}>
              {col.title}
            </td>)}
          </tr>
          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.empName}</td>
              {colList.map((col: any, colIndex: number) => <td
                key={`${index}-${colIndex}`}
                style={{ textAlign: 'center' }}>
                {formatNum(item[col.key] || '')}
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  margin: 5px 50px;
  table {
    border-collapse: collapse;
    border-color: #ccc;
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
    td.headerItem{
      /* font-weight: bold; */
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #ccc solid;
      word-break: break-all;
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
