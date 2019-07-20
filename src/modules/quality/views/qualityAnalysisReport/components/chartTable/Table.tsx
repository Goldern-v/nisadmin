import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function Table() {
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
        </colgroup>
        <tr className='header'>
          <td />
          <td>2月(分)</td>
          <td>3月(分)</td>
          <td>扣分增减(分)</td>
          <td>增减百分比(分)</td>
        </tr>
        <tr>
          <td>扣分科室</td>
          <td>
            <img src={require('./images/less.png')} alt='' className='lm-arrow' />
            6.3
          </td>
          <td>
            <img src={require('./images/more.png')} alt='' className='lm-arrow' />
            7.26
          </td>
          <td>81.76%</td>
          <td>42.48%</td>
        </tr>
        <tr className='footer'>
          <td>3</td>
        </tr>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 10px 50px;
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
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
    height: 15px;
  }
`
