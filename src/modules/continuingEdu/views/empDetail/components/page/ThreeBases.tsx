import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
// import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  threeBaseList: any[]
}

export default function ThreeBases(props: Props) {
  const { threeBaseList } = props
  console.log(threeBaseList,890)
  // const rowNum = 22 - threeBaseList.length
  return (
    <Wrapper>
      <div className='title title-1'>表一</div>
      <table>
        {/* <colgroup>
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
        </colgroup> */}
        <tbody>
          <tr>
            <td colSpan={3} style={{ height: 40 }}>
              <span className='title'>学分记录</span>
            </td>
          </tr>
          <tr className='head'>
            <td>类&nbsp;型</td>
            <td>项&nbsp;目</td>
            <td>时&nbsp;间</td>
            {/* <td>开发时间</td>
            <td>成绩</td>
            <td>是否及格</td>
            <td>成绩有效</td>
            <td>学分</td>
            <td>学时</td>
            <td>考试情况</td> */}
          </tr>
          {threeBaseList.map((item: any, index: number) => (
            <tr className='h-tr' key={index}>
              <td>{item.firstLevelMenuName}</td>
              <td>{item.title}</td>
              <td>{item.startTime}</td>
              {/* <td>{item.openTimeDesc}</td>
              <td>{item.gainScores}</td>
              <td>{item.passedDesc}</td>
              <td>{item.isValidResultDesc}</td>
              <td>{item.creditDesc}</td>
              <td>{item.classHoursDesc}</td>
              <td>{item.taskStatusDesc}</td> */}
            </tr>
          ))}
          {/* {numberToArray(1, Math.max(rowNum, 0)).map((item: any, index: number) => (
            <tr className='h-tr' key={index}>
              <td />
              <td />
              <td />
            </tr>
          ))} */}
        </tbody>
      </table>
      <div className='aside'>
        <div>
          注：从2015年开始填写，理论考核与
          <span style={{ color: 'red' }}>技术操作考核成绩</span>是指医院每年组织的三基考核成绩
        </div>
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
    width: 100%;
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
