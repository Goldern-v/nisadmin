import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function Chart() {
  return (
    <Wrapper>
      <div className='title'>2019年3月与2月质量扣分比较</div>
      <table>
        <colgroup>
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
          <col width='20' />
        </colgroup>

        <tr className='chart'>
          <td rowSpan={6} className='noBorder' />
          <td colSpan={6} />
        </tr>
        <tr className='chart'>
          <td colSpan={6} />
        </tr>
        <tr className='chart'>
          <td colSpan={6} />
        </tr>
        <tr className='chart'>
          <td colSpan={6} />
        </tr>
        <tr className='chart'>
          <td colSpan={6} />
        </tr>
        <tr className='chart'>
          <td>
            <div className='bar-con'>
              <Bar />
            </div>
          </td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
        </tr>

        <tr className='footer'>
          <td colSpan={7} />
        </tr>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 5px 50px;
  background: #f9faf0;
  overflow: hidden;
  padding: 15px;
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    tr {
      width: 100%;
      &.chart {
        td: {
          height: 40px;
        }
      }
      &.footer {
        td: {
          height: 30px;
        }
      }
      td.noBorder {
        border: 0;
      }
    }
    td {
      height: 40px;
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
  .title {
    text-align: center;
    margin: 0 10px 10px;
    font-size: 20px;
    font-weight: bold;
  }
  .bar-con {
    position: relative;
    width: 100%;
    height: 100%;
  }
`

const Bar = styled.div`
  width: 25px;
  height: 100px;
  background: #eba65b;
  position: absolute;
  bottom: 0px;
  margin: 0 auto;
  left: 0;
  right: 0;
`
