import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {}

export default function LevelChange() {
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
        <tr>
          <td colSpan={4}>
            <span className='title'>医学学历教育</span>
          </td>
        </tr>
        <tr>
          <td>就读时间</td>
          <td>毕业学校</td>
          <td>专业</td>
          <td>毕业时间</td>
        </tr>
        {numberToArray(0, 3).map(() => (
          <tr>
            <td />
            <td />
            <td />
            <td />
          </tr>
        ))}
      </table>
      <table className='table-1'>
        <colgroup>
          <col width='50%' />>
          <col width='50%' />>
        </colgroup>
        <tr>
          <td colSpan={4}>
            <span className='title'>职称及层级变动</span>
          </td>
        </tr>
        <tr>
          <td>取得职称资格及层级</td>
          <td>职称聘用时间</td>
        </tr>
        {numberToArray(0, 16).map(() => (
          <tr className='h-tr'>
            <td />
            <td />
          </tr>
        ))}
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    td {
      border: 1px solid #000;
      height: 30px;
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
    margin-top: 30px;
    font-size: 16px;
  }
  .h-tr {
    td {
      height: 38px;
    }
  }
  .title-1 {
    margin: 5px 0;
    margin-left: 20px;
  }
`
