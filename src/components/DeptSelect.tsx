/** 科室选择器全局使用  */
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore, appStore } from 'src/stores'
export interface Props {
  onChange: (value: string) => void
}

export interface DeptType {
  code: string
  name: string
}

export default observer(function DeptSelect (props: Props) {
  const [hasAllDept, setHasAllDept] = useState(false)
  let defaultValue = authStore.selectedDeptCode || authStore.defaultDeptCode
  let deptList = authStore.deptList
  const onChange = (value: string) => {
    authStore.selectDeptCode(value)
    props.onChange(value)
  }

  useEffect(() => {
    console.log(appStore.match.path, 999999999999999999999999999999999999999)
    const hasAllDeptRouteList = ['/home', '/nurseFilesList', '/statistic/:name']
    if (authStore.post == '护理部' || authStore.isAdmin) {
      if (hasAllDeptRouteList.indexOf(appStore.match.path) > -1) {
        setHasAllDept(true)
        if (!authStore.selectedDeptCode) {
          authStore.selectedDeptCode = '全院'
        }
        onChange(authStore.selectedDeptCode)
      } else {
        setHasAllDept(false)
        if (authStore.selectedDeptCode == '全院') {
          authStore.selectedDeptCode = authStore.defaultDeptCode
        }
      }
    }
    return () => {
      setTimeout(() => {
        // authStore.selectedDeptCode = authStore.defaultDeptCode
      }, 0)
    }
  }, [])

  return (
    <Wrapper>
      <Select value={defaultValue} showSearch style={{ width: 200 }} onChange={onChange}>
        {hasAllDept && (
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
