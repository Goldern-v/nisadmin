import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select, Button } from 'antd'
// import service from 'src/services/api'

const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  // 根据部门代码获取科室代码列表
  // service.wardDailyApiService.getDeptWithWardcode()
  // http://120.25.105.45:9864/crNursing/api/wardDaily/getDeptWithWardcode/030502

  return (
    <Wrapper>
      <Label>科室：</Label>
      <Select defaultValue='普外科护理单元' style={{ width: 200 }}>
        <Option value='骨科护理单元'>骨科护理单元</Option>
        <Option value='普外科护理单元'>普外科护理单元</Option>
        <Option value='泌尿外科护理单元'>泌尿外科护理单元</Option>
        <Option value='产科护理单元'>产科护理单元</Option>
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
