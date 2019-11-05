import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  threeBaseList: any[]
}

export default function ThreeBases(props: Props) {
  const { threeBaseList } = props
  const rowNum = 22 - threeBaseList.length
  return (
    <Wrapper>
      <div className='title title-1'>表七</div>
      <table>
        <colgroup>
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
        </colgroup>
        <tbody>
          <tr>
            <td colSpan={3} style={{ height: 40 }}>
              <span className='title'>医院三基考核</span>
            </td>
          </tr>
          <tr className='head'>
            <td>年&nbsp;度</td>
            <td>护理理论考核成绩（分）</td>
            <td style={{ color: 'red' }}>护理技术操作考核成绩（分）</td>
          </tr>
          {threeBaseList.map((item: any, index: number) => (
            <tr className='h-tr' key={index}>
              <td>{item.year}</td>
              <td>{item.theoryScore}</td>
              <td>{item.technologyScore}</td>
            </tr>
          ))}
          {numberToArray(1, Math.max(rowNum, 0)).map((item: any, index: number) => (
            <tr className='h-tr' key={index}>
              <td />
              <td />
              <td />
            </tr>
          ))}
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
