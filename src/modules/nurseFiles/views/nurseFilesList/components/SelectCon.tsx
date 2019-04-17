import styled from 'styled-components'
import React, { useState } from 'react'
import { Place } from '@/components/common'
import { Select, Input, Button } from 'antd'
import nurseFilesListViewModel from '../NurseFilesListViewModel'
import AddNursingModal from '../modal/AddNursingModal'

const Option = Select.Option

export default function SelectCon () {
  const [visible, setVisible] = useState(false)
  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  function handleChange (value: any) {
    console.log(`selected ${value}`)
  }

  function handleBlur () {
    console.log('blur')
  }

  function handleFocus () {
    console.log('focus')
  }
  return (
    <React.Fragment>
      <Wrapper>
        <Title>护士档案</Title>
        <Place />
        <span>科室：</span>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Select a person'
          optionFilterProp='children'
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          filterOption={(input, option) => input}
        >
          <Option value='jack'>Jack</Option>
          <Option value='lucy'>Lucy</Option>
          <Option value='tom'>Tom</Option>
        </Select>
        <Input placeholder='请输入搜索关键字' style={{ width: 160 }} />
        <Button type='primary'>搜索</Button>
        <Button onClick={() => setVisible(true)}>+添加护士</Button>
      </Wrapper>
      <AddNursingModal visible={visible} handleOk={handleOk} handleCancel={handleCancel} />
    </React.Fragment>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: #333;
  margin-bottom: 15px;
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
