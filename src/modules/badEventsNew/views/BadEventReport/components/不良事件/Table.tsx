import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TypeCompare, Report, DeptItem } from '../../types'
import { appStore } from 'src/stores'
import { badEventReportModel } from './../../BadEventReportModel'
import { Pre } from 'src/components/common'
export interface Props {
  list: DeptItem[]
}

export const EventTypeList = [
  {
    code: 'QCWET001',
    name: '压疮不良事件'
  },
  {
    code: 'QCWET002',
    name: '给药/治疗错误不良事件'
  },
  {
    code: 'QCWET003',
    name: '操作不当不良事件'
  },
  {
    code: 'QCWET004',
    name: '跌倒/坠床不良事件'
  },
  {
    code: 'QCWET005',
    name: '非计划性拔管不良事件'
  },
  {
    code: 'QCWET006',
    name: '输液/输血渗透不良事件'
  },
  {
    code: 'QCWET007',
    name: '烫伤不良事件'
  },
  {
    code: 'QCWET008',
    name: '走失不良事件'
  },
  {
    code: 'QCWET009',
    name: '自杀'
  }
]

const getEventTypeNameByCode = (code: string) => {
  let obj = EventTypeList.find((item: any) => item.code == code)
  return obj ? obj.name : ''
}
export default function Table(props: Props) {
  let { list } = props
  let report: Report = badEventReportModel.getDataInAllData('report') || {}

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='12.5%' />
          <col width='12.5%' />
          <col width='15%' />
          <col width='27.5%' />
          <col width='27.5%' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>时间</td>
            <td>当事人</td>
            <td>事件种类</td>
            <td>事情简要经过</td>
            <td>后果</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.eventDate}</td>
              <td>{item.eventEmpNames}</td>
              <td>{getEventTypeNameByCode(item.eventType)}</td>
              <td>
                {/* <Pre>{item.briefCourseEvent}</Pre> */}
                {item.briefCourseEvent}
              </td>
              <td>{item.result}</td>
            </tr>
          ))}
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
`
