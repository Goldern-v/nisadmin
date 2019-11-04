import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {}

export default function WorkRegistrationForm() {
  return (
    <Wrapper>
      {/* <div className='title title-1'>表七</div> */}
      <table>
        <colgroup>
          <col width='10%' />
          <col width='10%' />
          <col width='10%' />
          <col width='15%' />
          <col width='15%' />
          <col width='10%' />
          <col width='10%' />
          <col width='10%' />
          <col width='10%' />
        </colgroup>
        <tr>
          <td colSpan={9} style={{ height: 40 }}>
            <span className='title'>临床护理工作情况登记表</span>
          </td>
        </tr>
        <tr className='head'>
          <td>年&nbsp;度</td>
          <td>夜班</td>
          <td>查房</td>
          <td>护理会诊</td>
          <td>病例讨论</td>
          <td>个案</td>
          <td>小讲课</td>
          <td>带教</td>
          <td>证明人</td>
        </tr>
        {numberToArray(0, 22).map(() => (
          <tr className='h-tr'>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        ))}
      </table>
      <div className='aside'>
        <div>备注： 夜班指N班或全夜，查房指业务查房或教学查房，病例讨论含死亡病例及疑难病例，</div>
        <div>&nbsp;&nbsp;&nbsp; 小讲课指科内、院内、院外小讲课，带教包含实习生、新毕业生、进修生。</div>
        <div>&nbsp;&nbsp;&nbsp; 以上项目填写数量即可，但验收核实时均要求提供佐证材料。自2015年起开始填写。</div>
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
