import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
export interface Props {
  data: any,
  onDataChange: Function
}

export default function SubTable(props: Props) {
  const { data, onDataChange } = props

  return <Wrapper>
    <table>
      <colgroup>
        <col width="100" />
        <col width="100" />
      </colgroup>
      <tbody>
        <tr>
          <td
            rowSpan={3}
            className="title-td">
            中医护理方案实施过程中的问题分析
          </td>
          <td className="title-td">存在问题</td>
          <td>
            <Input.TextArea
              className="data-edit"
              value={data['存在问题']}
              onChange={(e) => {
                onDataChange({
                  ...data,
                  ['存在问题']: e.target.value,
                })
              }} />
          </td>
        </tr>
        <tr>
          <td className="title-td">原因分析</td>
          <td>
            <Input.TextArea
              className="data-edit"
              value={data['原因分析']}
              onChange={(e) => {
                onDataChange({
                  ...data,
                  ['原因分析']: e.target.value,
                })
              }} />
          </td>
        </tr>
        <tr>
          <td className="title-td">整改措施</td>
          <td>
            <Input.TextArea
              className="data-edit"
              value={data['整改措施']}
              onChange={(e) => {
                onDataChange({
                  ...data,
                  ['整改措施']: e.target.value,
                })
              }} />
          </td>
        </tr>
        <tr>
          <td className="title-td">备注</td>
          <td colSpan={2}>
            <Input.TextArea
              className="data-edit"
              value={data['备注']}
              onChange={(e) => {
                onDataChange({
                  ...data,
                  ['备注']: e.target.value,
                })
              }} />
          </td>
        </tr>
      </tbody>
    </table>
  </Wrapper>
}
const Wrapper = styled.div`
  padding-bottom: 10px;
  min-height: 200px;
  table{ 
    border-collapse: collapse;
    border-color:rgb(232, 232, 232);
    width: 100%;
    td,th{
      text-align: center;
      font-size: 12px;
      color: rgb(232, 232, 232);
      padding: 0;
      border: 1px rgb(232, 232, 232) solid;
    }
    .title-td{
      font-weight: bold;
      color: #444;
      background-color: #f2f4f5;
      padding: 10px;
    }
    .data-edit{
      text-align: left;
    }
    textarea{
      font-size: 12px;
    }
  }
`