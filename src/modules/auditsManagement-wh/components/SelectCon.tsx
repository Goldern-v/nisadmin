import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Place } from 'src/components/common'
import { Select, Input, Button } from 'antd'
import DeptSelect from 'src/components/DeptSelect'
import emitter from 'src/libs/ev'
import store from 'src/stores'
import service from 'src/services/api'

const Option = Select.Option
interface Props {
  showType: any
  setShowType: any
  keyword: any
  setKeyword: any
}
export default function SelectCon(props: Props) {
  const [visible, setVisible] = useState(false)
  const [showTypeDict, setShowTypeDict] = useState([])
  let { showType, setShowType, keyword, setKeyword } = props
  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  // const onChange = (value: string) => {
  //   emitter.emit('refreshNurseAuditTable', searchText)
  // }
  // const onChangeSearchText = (e: any) => {
  //   setSearchText(e.target.value)
  // }

  const onSearch = () => {
    emitter.emit('refreshNurseAuditTable')
  }
  const SearchByText = (e: React.ChangeEvent<HTMLInputElement>) => {}

  useEffect(() => {
    service.commonApiService.dictInfo('audit_type').then((res) => {
      setShowTypeDict(res.data)
      setShowType(res.data[0].code)
    })
  }, [])
  return (
    <React.Fragment>
      <Wrapper>
        <Title>审核管理</Title>
        {/* <DeptSelect onChange={onChange} /> */}
        <Place />
        <span>科室：</span>
        <DeptSelect onChange={() => {}} />
        <span style={{ marginLeft: 20 }}>类型：</span>
        <Select value={showType} onChange={(value: any) => setShowType(value)}>
          {showTypeDict.map((item: any) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder='输入要搜索的关键字，包括提交人，标题，审核意见'
          style={{ width: 360 }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
