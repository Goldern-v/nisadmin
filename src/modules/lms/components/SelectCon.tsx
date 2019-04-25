import styled from 'styled-components'
import React, { useState } from 'react'
import { Place } from 'src/components/common'
import { Select, Input, Button } from 'antd'
import DeptSelect from 'src/components/DeptSelect'
import { DatePicker } from 'antd'
import createModal from 'src/libs/createModal'
import AddLmsModal from '../modal/AddLmsModal'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
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
  const addLmsModal = createModal(AddLmsModal)
  return (
    <React.Fragment>
      <Wrapper>
        <span>创建时间：</span>
        <RangePicker />
        <Place />
        <span>科室：</span>
        <DeptSelect onChange={onChange} />
        <div style={{ width: 10 }} />
        <span>物流：</span>
        <DeptSelect onChange={onChange} />
        <Input placeholder='物品名称、物流单号' style={{ width: 160 }} onChange={SearchByText} />
        <Button type='primary' onClick={onSearch}>
          搜索
        </Button>
        <Button onClick={() => addLmsModal.show()}>创建物流</Button>
      </Wrapper>
      <addLmsModal.Component />
    </React.Fragment>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: #333;
  margin-bottom: 5px;
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
