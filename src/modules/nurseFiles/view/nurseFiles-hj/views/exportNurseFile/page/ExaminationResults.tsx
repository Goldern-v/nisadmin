import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  yearCheckList: any[]
}

export default function ExaminationResults(props: Props) {
  const { yearCheckList } = props
  const rowNum = 23 - yearCheckList.length
  return (
    <Wrapper>
      <div className='title title-1'>表五</div>
      <table>
        <colgroup>
          <col width='25%' />
          <col width='25%' />
          <col width='25%' />
          <col width='25%' />
          {/*<col width='20%' />*/}
        </colgroup>
        <tbody>
          <tr>
            <td colSpan={4} style={{ height: 40 }}>
              <span className='title'>年度考核结果</span>
            </td>
          </tr>
          <tr className='head'>
            <td>序号</td>
            <td>年度</td>
            <td>考核结果</td>
            <td>状态</td>
            {/*<td>基本称职</td>*/}
            {/*<td>不称职</td>*/}
          </tr>
          {yearCheckList.map((item: any, index: number) => (
            <tr className='h-tr' key={index}>
              <td>{index+1}</td>
              <td>{item.year}</td>
              <td>{item.checkResult}</td>
              <td>{item.auditedStatusName}</td>
              {/*<td>{item.checkResult == '优秀' ? '✔' : ''}</td>*/}
              {/*<td>{item.checkResult == '称职' ? '✔' : ''}</td>*/}
              {/*<td>{item.checkResult == '基本称职' ? '✔' : ''}</td>*/}
              {/*<td>{item.checkResult == '不称职' ? '✔' : ''}</td>*/}
            </tr>
          ))}
          {numberToArray(1, Math.max(0, rowNum)).map((item: any, index: number) => (
            <tr className='h-tr' key={index}>
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className='aside'>
        <div>备注：1. 医学学历教育：从参加医学教育开始填写</div>
        <div>&nbsp;&nbsp;&nbsp;2. 职称及层级变动：职称从聘用初级职称开始填写，层级自2016年1月起填写</div>
        <div>&nbsp;&nbsp;&nbsp;3. 继续教育：从工作之日起，学习时间超过7天的需进行登记填写，学习形式包括院</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp; 外进修、短期培训、院内轮转、网上学习</div>
      </div> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    td {
      border: 1px solid #000;
      height: 29px;
      text-align: center;
    }
  }
  .title {
    font-family: '黑体' !important;
    font-size: 18px;
    font-weight: bold;
  }
  .table-1 {
    margin-top: -1px;
  }
  .aside {
    margin-top: 12px;
    font-size: 16px;
  }
  .h-tr {
    td {
      height: 35px;
    }
  }
  .head {
    font-weight: bold;
  }
  .title-1 {
    margin: 5px 0;
    margin-left: 20px;
  }
`
