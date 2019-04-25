import styled from 'styled-components'
import React, { useState } from 'react'
import { Place } from 'src/components/common'
import { Select, Input, Button } from 'antd'
import DeptSelect from 'src/components/DeptSelect'
import { DatePicker } from 'antd'
import createModal from 'src/libs/createModal'
import AddLmsModal from '../modal/AddLmsModal'
import { appStore } from 'src/stores'

const { MonthPicker, RangePicker } = DatePicker
const Option = Select.Option

export default function BackCon () {
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
  const addLmsModal = createModal(AddLmsModal)
  return (
    <React.Fragment>
      <Wrapper>
        <Button onClick={() => appStore.history.push('/lms')}>返回上一页</Button>
        <Place />
        <Button style={{ color: 'red' }}>删除物流单</Button>
      </Wrapper>
    </React.Fragment>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: #333;
  background: #fff;
  padding: 8px 10px;
  border-bottom: 1px solid #dbe0e4;
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
