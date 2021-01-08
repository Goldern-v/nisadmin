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

  const sum = (item: any) => {
    let total = 100;
    let nursingDeduct = Number(
      formatNum(
        -Number(item.nursingDeduct)
      )
    )
    if (isNaN(nursingDeduct)) nursingDeduct = 0

    let workloadDeduct = Number(
      formatNum(
        -Number(item.workloadDeduct)
      )
    )
    if (isNaN(workloadDeduct)) workloadDeduct = 0

    let satisfactionDeduct = Number(
      formatNum(
        -Number(item.satisfactionDeduct)
      )
    )
    if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0

    return formatNum(total - nursingDeduct - workloadDeduct - satisfactionDeduct)
  }

  /**12月份显示年度加分和明细 */
  const showAddPintCol = report.month === 12

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='80' />
          <col width='100' />
          <col />
          <col />
          <col />
          <col />
          {showAddPintCol && (
            <React.Fragment>
              <col />
              <col width='180' />
            </React.Fragment>
          )}
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>姓名</td>
            <td>护理质量</td>
            <td>工作量</td>
            <td>满意度</td>
            <td>考核总分</td>
            <td>星级</td>
            {showAddPintCol && (
              <React.Fragment>
                <td>年度加分</td>
                <td>加分明细</td>
              </React.Fragment>
            )}
          </tr>
          {list.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{item.empName}</td>
              {item.noCheck ?
                <React.Fragment>
                  <td style={{ textAlign: 'center' }} className="headerItem">不参加考核原因</td>
                  <td style={{ textAlign: 'center' }} colSpan={4}>{item.noCheckReason || ''}</td>
                </React.Fragment> :
                <React.Fragment>
                  <td style={{ textAlign: 'center' }}>{formatNum(item.nursingDeduct)}</td>
                  <td style={{ textAlign: 'center' }}>{formatNum(item.workloadDeduct)}</td>
                  <td style={{ textAlign: 'center' }}>{formatNum(item.satisfactionDeduct)}</td>
                  <td>{sum(item)}</td>
                  <td style={{ textAlign: 'center' }}>{item.starClass}</td>
                </React.Fragment>}
              {showAddPintCol && (
                <React.Fragment>
                  <td style={{ textAlign: 'left', }}>{(item.addPointsItemList || [])
                    .map((scoreDetailItem: any, scoreDetailItemIdx: number) => (
                      <div style={{ wordBreak: 'break-all', fontSize: '12px' }}>{scoreDetailItemIdx + 1}.{scoreDetailItem.itemName}</div>
                    ))}</td>
                  <td>{item.annualAddPoints}</td>
                </React.Fragment>
              )}
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
