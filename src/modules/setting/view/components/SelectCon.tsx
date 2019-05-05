import styled from 'styled-components'
import React, { useState } from 'react'
import { Place } from 'src/components/common'
import { Select, Input, Button } from 'antd'
import DeptSelect from 'src/components/DeptSelect'

const Option = Select.Option

export default function SelectCon () {
  const [visible, setVisible] = useState(false)
  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onChange = (value: string) => {}
  const onSearch = () => {}
  const SearchByText = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <React.Fragment>
      <Wrapper>
        <Title>审核管理</Title>
        <Place />
        {/* <span>科室：</span> */}
        {/* <DeptSelect onChange={onChange} /> */}
        <Input
          placeholder='输入要搜索的关键字，包括提交人，标题，审核意见'
          style={{ width: 360 }}
          onChange={SearchByText}
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
