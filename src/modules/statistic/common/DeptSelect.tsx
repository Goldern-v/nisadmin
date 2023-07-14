/** 科室选择器  */
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore } from 'src/stores'
export interface Props {
  onChange: (value: string) => void
}

export interface DeptType {
  code: string,
  name: string
}

export default observer(function DeptSelect(props: Props) {
  let defaultValue = authStore.selectedDeptCode || authStore.defaultDeptCode
  let deptList = authStore.deptList
  const onChange = (value: string) => {
    authStore.selectDeptCode(value)
    props.onChange(value)
  }
  useEffect(() => {
    onChange(defaultValue)
  }, [])
  return (
    <Wrapper>
      <Select
        defaultValue={defaultValue}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        style={{ width: 200 }}
        onChange={onChange}
      >
        {deptList.map((item: DeptType) => (
          <Select.Option key={item.code} value={item.code} title={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
