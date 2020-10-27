import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Report } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from './../../BadEventReportModel'
import { Pre } from 'src/components/common'
export interface Props {
  list: any[],
  total: number,
}

export default function Table(props: Props) {
  let { list, total } = props
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  const getRate = (current: number, total: number) => {
    if (total <= 0) return '0%'
    let rate = Math.round(current / total * 10000) / 100
    return `${rate}%`
  }

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>事件分类</td>
            <td>发生次数</td>
            <td>占比例</td>
          </tr>
          {list.map((item: any, idx: number) => <tr key={idx}>
            <td className="bad-event-title">{item.eventType}</td>
            <td>{item.happenNum}</td>
            <td>{getRate(item.times, total)}</td>
          </tr>)}
          <tr className="sum">
            <td className="bad-event-title">合计</td>
            <td>{total}</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}
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
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
  .aside {
    font-size: 12px;
    margin-top: 10px;
    color: red;
  }
  .bad-event-title{
    text-align:left;
    padding: 0 10px;
  }
`
