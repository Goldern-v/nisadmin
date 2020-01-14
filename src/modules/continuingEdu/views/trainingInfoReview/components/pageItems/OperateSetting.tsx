import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export interface Props {
  data?: any
}

//参与人员
export default function OperateSetting(props: Props) {
  const { data } = props

  return <Wrapper>
    <div className="content-item-title">上传设置</div>
    <div className="row">
      <span className="label w-98">总成绩:</span>
      <span className="content">100</span>
    </div>
    <div className="row">
      <span className="label w-98">及格分数线:</span>
      <span className="content">60</span>
    </div>
    <div className="row">
      <span className="label w-98">实操考核评分项:</span>
      <span className="content">3项</span>
    </div>
    <div className="pd">
      <table>
        <colgroup>
          <col width='50px' />
        </colgroup>
        <tbody>
          <tr className="header">
            <td>序号</td>
            <td>评分项标题</td>
            <td>分值</td>
          </tr>
          <tr>
            <td>1</td>
            <td>走位考核标准</td>
            <td>40</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  font-size: 13px;
  .pd{
    margin-bottom: 10px;
    padding: 0 15px;
  }
  .row{
    margin-bottom: 5px;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    .label{
      float: left;
      text-align: right;
      &.w-98{
        width: 98px;
      }
    }
    .content{
      overflow: hidden;
    }
  }
  table{
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
      font-size: 13px;
      color: #000;
      border: 1px #cccccc solid;
    }
  }
`