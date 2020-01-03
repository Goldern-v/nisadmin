import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
// import { TypeCompare, Report } from '../../types'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import Zmage from 'react-zmage'
// import { starRatingReportEditModel } from './../../model/StarRatingReportEditModel'

export interface Props {
  list: any[]
  totalSorce: number
}

export default observer(function Table(props: Props) {
  let { list, totalSorce } = props
  // let report: Report = starRatingReportEditModel.getDataInAllData('report') || {}

  // const sum = (item: any) => {
  //   let total = 100;
  //   let nursingDeduct = item.nursingDeduct || 0
  //   let workloadDeduct = item.workloadDeduct || 0
  //   let satisfactionDeduct = item.satisfactionDeduct || 0

  //   return total - nursingDeduct - workloadDeduct - satisfactionDeduct
  // }

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='80' />
          <col />
          <col />
          <col />
          <col width='170' />
          <col />
          <col />
          <col />
          <col width='160' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>患者姓名</td>
            <td>疾病诊断</td>
            <td>家庭住址</td>
            <td>联系方式</td>
            <td>住院起止时间</td>
            <td>家访内容</td>
            <td>患者反馈意见</td>
            <td>家访参加人员</td>
            <td>附件</td>
          </tr>

          {list.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{item.patientName}</td>
              <td style={{ textAlign: 'left' }}>{item.diagnosis}</td>
              <td style={{ textAlign: 'left' }}>{item.address}</td>
              <td style={{ textAlign: 'left' }}>{item.contactInformation}</td>
              <td style={{ textAlign: 'center' }}>
                {item.admissionDate} - {item.dischargeDate}
              </td>
              <td style={{ textAlign: 'left' }}>{item.accessContent}</td>
              <td style={{ textAlign: 'left' }}>{item.feedBack}</td>
              <td style={{ textAlign: 'left' }}>{item.empNames}</td>
              <td style={{ textAlign: 'left' }}>
                {item.attachList && item.attachList.map((item: any, idx: number) => {
                  return <span key={idx}>
                    <span style={{ verticalAlign: 'middle' }}>附件{idx + 1}: </span>
                    {/* <a >{item.name}</a> */}
                    <PreViewCon
                      title={item.name}
                      onClick={() => Zmage.browsing({ src: item.path, backdrop: 'rgba(0,0,0, .8)' })}>{item.name}
                    </PreViewCon>
                    <br />
                  </span>
                })}
              </td>
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
      word-break:break-all;
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

const PreViewCon = styled.a`
  width: 100px;
  display: inline-block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`
