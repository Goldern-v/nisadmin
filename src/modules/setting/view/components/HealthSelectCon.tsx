import styled from 'styled-components'
import React, { useState } from 'react'
import { Place } from 'src/components/common'
import { Select, Button } from 'antd'
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
    emitter.emit('自动推送设置-刷新')
  }
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }

  const onSearch = () => {
    emitter.emit('refreshNurseAuditTable', searchText)
  }
  const SearchByText = (e: React.ChangeEvent<HTMLInputElement>) => {}

  const add = () => {
    emitter.emit('自动推送设置-添加')
    console.log(1111111111111)
  }
  return (
    <React.Fragment>
      <Wrapper>
        <Title>自动推送设置</Title>
        <Place />
        <span>科室：</span>
        <DeptSelect onChange={onChange} extraDept={[{ name: '公共', code: '*' }]} />
        <Button onClick={add}>添加</Button>
      </Wrapper>
     </React.Fragment>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height:60px;
  /* font-size: #333; */
  /* margin-bottom: 15px; */
  /* margin-top: 25px; */
  button {
    margin-left: 10px;
  }
`
const Title = styled.div`
  font-size:20px;
  font-weight:600;
  float:left;
  /* margin-left: 20px; */
  font-weight: bold;
  color: #000;
  line-height: 60px;
`
