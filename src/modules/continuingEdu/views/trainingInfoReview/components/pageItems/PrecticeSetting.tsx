import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import createModal from "src/libs/createModal";
import TestPageModal from './../TestPageModal/TestPageModal'

export interface Props {
  info?: any
}

//参与人员
export default function PrecticeSetting(props: Props) {
  const testPage = createModal(TestPageModal)
  const { info } = props

  return <Wrapper>
    <div className="content-item-title">上传设置</div>
    <div className="pd">
      <span>习题上传：270题（顺序出题）</span>
      <span><Button size="small" className="fr">习题预览</Button></span>
    </div>
    <div className="pd">
      <table>
        <colgroup>
          <col width='50px' />
        </colgroup>
        <tbody>
          <tr className="header">
            <td>序号</td>
            <td>出题类型</td>
            <td>题目数</td>
          </tr>
          <tr>
            <td>1</td>
            <td>单选题</td>
            <td>120</td>
          </tr>
        </tbody>
      </table>
    </div>
    <testPage.Component />
  </Wrapper>
}
const Wrapper = styled.div`
  font-size: 13px;
  .pd{
    margin-bottom: 10px;
    padding: 0 15px;
  }
  .fr{
    float: right;
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