import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select, Button } from 'antd'

const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <Label>科室</Label>
      <Select defaultValue='lucy' style={{ width: 200 }}>
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='disabled' disabled>
          Disabled
        </Option>
        <Option value='Yiminghe'>yiminghe</Option>
      </Select>
      <Button style={{ marginLeft: 20, marginRight: 10 }}>编辑排班</Button>
      <Button>导出Excel</Button>
      <div style={{ flex: 1 }} />
      <LinkText>排班人员设置</LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>班次设置</LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>排班套餐设置</LinkText>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

const BreakLine = styled.div`
  padding: 0 10px;
`

const LinkText = styled.div`
  cursor: pointer;
`

const Label = styled.div``
