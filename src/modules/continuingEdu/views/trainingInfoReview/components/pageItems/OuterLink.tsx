import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import createModal from "src/libs/createModal";

export interface Props {
  info?: any
}

//参与人员
export default function OuterLink(props: Props) {
  const { info } = props

  const studyLinkList = (info.studyLinkList || []) as any[]

  return <Wrapper>
    <div className="content-item-title">外网资料</div>
    <div className="pd">
      {studyLinkList.length > 0 && <table>
        <colgroup>
          <col width='50px' />
          <col />
          <col />
          <col width='60px' />
        </colgroup>
        <tbody>
          <tr className="header">
            <td>序号</td>
            <td>标题</td>
            <td>外网链接</td>
            <td>操作</td>
          </tr>
          {studyLinkList.map((item: any, idx: number) =>
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.linkTitle}</td>
              <td>{item.linkAddress}</td>
              <td>
                <a href={item.linkAddress || ''} target="_blank">预览</a>
              </td>
            </tr>)}
        </tbody>
      </table>}
      {studyLinkList.length <= 0 && <span style={{ color: '#aaa' }}>暂无外网资料</span>}
    </div>
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