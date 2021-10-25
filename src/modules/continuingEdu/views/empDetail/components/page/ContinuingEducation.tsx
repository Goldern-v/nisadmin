import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
// import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  continuingEducationList: any[]
}

export default function ContinuingEducation(props: Props) {
  const { continuingEducationList } = props
  const rowNum = 21 - continuingEducationList.length
  return (
    <Wrapper>
      <div className='title title-1'>表二</div>
      <table>
        <colgroup>
          <col width='17%' />
          <col width='33%' />
          <col width='18%' />
          <col width='15%' />
        </colgroup>
        <tbody>
          <tr>
            <td colSpan={4}>
              <span className='title'>继续教育</span>
            </td>
          </tr>
          <tr className='head'>
            <td>起止年月</td>
            <td>培训单位</td>
            <td>培训内容</td>
            <td>学时（分）</td>
          </tr>
          {continuingEducationList.map((item: any, index: number) => (
            <tr className='h-tr' key={index}>
              <td>
                {item.startTime} - {item.endTime}
              </td>
              <td>{item.trainingUnit}</td>
              <td>{item.trainingContent}</td>
              <td>{item.hours}</td>
            </tr>
          ))}
          {numberToArray(1, Math.max(0, rowNum)).map((item: any) => (
            <tr className='h-tr' key={item}>
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <div className='aside'>
        <div>备注：1. 医学学历教育：从参加医学教育开始填写</div>
        <div>&nbsp;&nbsp;&nbsp;2. 职称及层级变动：职称从聘用初级职称开始填写，层级自2016年1月起填写</div>
        <div>&nbsp;&nbsp;&nbsp;3. 继续教育：从工作之日起，学习时间超过7天的需进行登记填写，学习形式包括院</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp; 外进修、短期培训、院内轮转、网上学习</div>
      </div>
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
    letter-spacing: 8px;
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
