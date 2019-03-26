import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select, Button } from 'antd'
import { authStore } from '@/stores'
import service from 'src/services/api'

const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar () {
  // 在react hooks 用 useState 定义 class component 里的 state 变量
  const [wardCode, setWardCode] = useState('')
  const [wardValue, setWardValue] = useState('')
  const [wardList, setWardList] = useState([
    {
      deptCode: '',
      deptName: ''
    }
  ])
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setWardList([])
    if (authStore.getUser()) {
      let deptCode = authStore.getUser().deptCode || ''
      // 根据部门代码获取科室代码列表
      service.wardDailyApiService.getDeptWithWardcode(deptCode).then((res) => {
        console.log('更新科室列表', res)
        setWardList(res.data.data) // 更新科室列表
        setWardValue(res.data.data[0].deptName)
        console.log('更新wardList:', wardValue, wardCode, wardList)
      })
    }
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const handleChange = (code: any) => {
    // console.log('handleChange', code, wardList)
    wardList.map((ward) => {
      if (ward.deptCode === code) {
        setWardCode(ward.deptCode)
        setWardValue(ward.deptName)
      }
    })
  }

  return (
    <Wrapper>
      <Label>科室：</Label>
      <Select value={wardValue} onChange={handleChange} style={{ width: 200 }}>
        {wardList.map((ward) => (
          <Option key={ward.deptCode} value={ward.deptCode}>
            {ward.deptName}
          </Option>
        ))}
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
