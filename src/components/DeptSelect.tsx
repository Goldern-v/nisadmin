/** 科室选择器全局使用  */
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore } from 'src/stores'
export interface Props {
  onChange: (value: string) => void
  /** 是否包含全院 */
  hasAllDept?: boolean
}

export interface DeptType {
  code: string
  name: string
}

export default observer(function DeptSelect (props: Props) {
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
      <Select value={defaultValue} showSearch style={{ width: 200 }} onChange={onChange}>
        {props.hasAllDept && (
          <Select.Option key={'全院'} value={'全院'}>
            全院
          </Select.Option>
        )}

        {deptList.map((item: DeptType) => (
          <Select.Option key={item.code} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
