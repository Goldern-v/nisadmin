import styled from 'styled-components'
import React, { useState } from 'react'
import { Place } from 'src/components/common'
import { Select, Input, Button } from 'antd'
import DeptSelect from 'src/components/DeptSelect'
import emitter from 'src/libs/ev'

const Option = Select.Option

export default function SelectCon() {
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onChange = (value: string) => {
    emitter.emit('refreshNurseAuditTable', searchText)
  }
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }

  const onSearch = () => {
    emitter.emit('refreshNurseAuditTable', searchText)
  }
  const SearchByText = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <React.Fragment>
      <Wrapper>
        <Title>审核管理</Title>
        {/* <DeptSelect onChange={onChange} /> */}
        <Place />
        <span>科室：</span>
        <DeptSelect onChange={onChange} />
        <Input
          placeholder='输入要搜索的关键字，包括提交人，标题，审核意见'
          style={{ width: 360 }}
          value={searchText}
          onChange={onChangeSearchText}
        />
        <Button type='primary' onClick={onSearch}>
          搜索
        </Button>
        {/* <Button onClick={() => setVisible(true)}>+添加护士</Button> */}
      </Wrapper>
    </React.Fragment>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: #333;
  input,
  button {
    margin-left: 10px;
  }
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`
